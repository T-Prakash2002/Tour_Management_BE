const { UserModel } = require("../model/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user register

const register = async (req, res) => {

    const { email, username, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.send({ 
                success: false, 
                message: 'user already exists' 
            })
        }

        const dbRes = await UserModel.create({
            username: username,
            email: email,
            password: hash
        });

        if (dbRes) {
            return res.send(
                {
                    success: true,
                    message: 'succesfully created',
                }
            );
        }

    } catch (error) {
        return res.send(
            {
                success: false,
                message: 'failed to created'
            }
        );
    }
};


const login = async (req, res) => {

    const email = req.body.email
    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' })
        }

        const checkCorrectPassword = bcrypt.compare(req.body.password, user.password)

        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'incorrect password' })
        }

        const { password, role, ...rest } = user._doc


        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({ token, data: { ...rest }, role ,success:true, message:'succesfully logged in'});

    } catch (error) {
        res.status(500).json({ success: false, message: 'failed to log in' })
    }
};

const verifyUser = async (id) => {
    try {
        const user = await UserModel.findOne({ _id: id });

        if (!user) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

module.exports = { register, login ,verifyUser };

