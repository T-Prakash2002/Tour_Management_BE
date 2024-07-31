const mongoose = require('mongoose')
const bookingSchema= new mongoose.Schema(
{
    userId:{
        type:String,
    },
    userEmail:{
          type:String,
    },
    tourName:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    guestSize:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    bookAt:{
        type:Date,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    tourId:{
        type:mongoose.Schema.Types.ObjectId,
    }
    
},
{
    timestamps:true
}
);

const BookingModel= mongoose.model("Booking", bookingSchema);


module.exports={BookingModel}