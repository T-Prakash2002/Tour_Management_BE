
const mongoose = require('mongoose');

const connect = async () => {
    try {

        if (mongoose.connection.readyState === 1){
            return;
        }
        await mongoose.connect(process.env.MONGO_URL)
        console.log('mdb connected');
    } catch (error) {
        console.log('mdb not connected');
    }
};


module.exports = {connect};