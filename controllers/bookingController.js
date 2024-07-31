const {BookingModel} = require('../model/Booking.js');
const {TourModel} = require('../model/Tour.js');

const createBooking = async (req, res)=>{

    try {
        const savedBooking =await BookingModel.create(req.body);

        res.status(200).json({success:true, message:'your tour is booked',
            data:savedBooking,
        })
    } catch (error) {
        return res.send({success:false, message:'internal server error',
            
        })
        
    }
};

const getBooking = async (req, res) => {

    const email = req.params.email;

    try{
        const book = await BookingModel.find({userEmail:email})

        res.status(200).json({success:true, message:'successful',
            data:book,
        })
    }catch(error){
        return res.status(500).json({success:false, message:'internal server error',
            
        })
    }
};

const deleteBooking = async (req, res) => {
    const id = req.params.id;
    try{
        const book = await BookingModel.findByIdAndDelete(id);
        res.status(200).json({success:true, message:'successfully Deleted',
            data:book,
        })
    }catch(error){
        return res.status(500).json({success:false, message:'internal server error',
            
        })
    }
}

const updateBooking = async (req, res) => {
    const id = req.params.id;

    try{
        const book = await BookingModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({success:true, message:'successfully updated',
            data:book,
        })
    }catch(error){
        return res.status(500).json({success:false, message:'internal server error',
            
        })
    }
}

module.exports = {createBooking, getBooking,deleteBooking,updateBooking};

