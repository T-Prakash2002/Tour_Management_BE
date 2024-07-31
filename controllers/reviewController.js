const {TourModel} = require('../model/Tour.js');
const {ReviewModel} = require('../model/Review.js');

const createReview = async (req, res)=>{

    const tourId = req.params.tourId;
    // const newReview = new Review({...req.body})

    try {
        // create a new review
        // const savedReview = await newReview.save()

        const savedReview = await ReviewModel.create({
            productId:tourId,
            username:req.body.username,
            reviewText:req.body.review,
            rating:req.body.rating
        })

        // after creating a nem review now update the reviews array of the tour

        console.log("tourId = "+tourId)

        await TourModel.findByIdAndUpdate(tourId,{$push: {reviews:savedReview._id}});

        console.log("savedReview"+savedReview._id)

        return res.send({succes:true,message:'Review submitted', data: savedReview})

    } catch (error) {
        res.send({succes:false, message:'failed to submit',})
    }
}

module.exports = createReview;