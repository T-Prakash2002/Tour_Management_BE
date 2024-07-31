const express = require('express');
const {UserModel: User} = require('../model/User.js');


const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: 'succesfull',
                    data: savedUser
                }
            )

    } catch (error) {
        res
            .status(500)
            .json(
                {
                    success: true,
                    message: 'failed',

                }
            )

    }
};

//update User
const updateUser = async (req, res) => {

    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: 'succesfully updated',
                    data: updateUser,
                }
            );
    } catch (error) {
        res
            .status(500)
            .json(
                {
                    success: false,
                    message: 'failed to updated',

                }
            );

    }
};
//delete User
const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id)
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: 'succesfully updated',
                }
            );
    } catch (error) {
        res
            .status(500)
            .json(
                {
                    success: false,
                    message: 'failed to deleted',

                }
            );

    }
}
//getsingle User
const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: 'succesful',
                    data: user,
                }
            );
    } catch (error) {
        res
            .status(404)
            .json(
                {
                    success: false,
                    message: 'not found',

                }
            );

    }
}
//getall User
const getAllUser = async (req, res) => {

    try {
        const users = await User.find({})
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: 'succesfully',
                    data: users,
                }
            );
    } catch (error) {

        res
            .status(404)
            .json(
                {
                    success: false,
                    message: 'not found',

                }
            );

    }
};

const userCrud = { createUser, deleteUser, updateUser, getAllUser, getSingleUser };

module.exports = userCrud;