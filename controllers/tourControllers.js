const {TourModel:Tour} = require('../model/Tour.js');



//getsingle tour
const getSingleTour = async (req, res) => {
    const id = req.params.id
    try {
        const tour = await Tour.findById(id).populate('reviews')
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: 'succesful',
                    data: tour,
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
//getall tour
const getAllTour = async (req, res) => {

    // for pagination

    const page = parseInt(req.query.page);

    try {
        const tours = await Tour.find({})
            .populate('reviews')
            .skip(page * 8)
            .limit(8);
        res
            .status(200)
            .json(
                {
                    success: true,
                    count: tours.length,
                    message: 'succesfully',
                    data: tours,
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

// get tour by search

const getTourBySearch = async (req, res) => {

    // here i means case sensitive
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {

        //gte means greater tha equal
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize }
        }).populate('reviews');

        res
            .status(200)
            .json(
                {
                    success: true,
                    message: 'succesfully',
                    data: tours,
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


//get featured tour
const getFeaturedTour = async (req, res) => {

    try {
        const tours = await Tour.find({featured:true})
        .populate('reviews')
        .limit(8);

        res.status(200)
            .json(
                {
                    success: true,
                    message: 'succesfully',
                    data: tours,
                }
            );
    } catch (error) {

        res
            .status(404)
            .json(
                {
                    success: false,
                    message: 'not found in database',

                }
            );

    }
};

// get tour counts
const getTourCount = async (req, res) => {


    try {
        const tourCount = await Tour.estimatedDocumentCount()

        res
            .status(200)
            .json(
                {
                    success: true,
                    data: tourCount,
                }
            );
    } catch (error) {

        res
            .status(500)
            .json(
                {
                    success: false,
                    message: 'failed to fetech',

                }
            );

    }
};




const crud = { getAllTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount };

module.exports = crud;