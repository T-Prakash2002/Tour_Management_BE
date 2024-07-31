const express = require('express');
const dotenv = require('dotenv');
const { connect } = require('./utils/db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const {
    login, register, verifyUser
} = require('./controllers/authControllers.js')

const {
    createBooking,
    getBooking,
    deleteBooking,
    updateBooking,
} = require('./controllers/bookingController.js')

const {
    getAllTour,
    getSingleTour,
    getTourBySearch,
    getFeaturedTour,
    getTourCount,
} = require('./controllers/tourControllers')

const createReview = require('./controllers/reviewController.js');



dotenv.config()
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if(  req.path == '/api/booking' || req.path == '/api/bookings/user/:email' || req.path=='/api/bookings/update/:id'){

    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 

      console.log(decoded)
      const verify=await verifyUser(decoded.id)


      if(verify){
        next();
      }else{
        res.status(401).json({
          message: 'Invalid token'
        });
      }

    }catch(err){
      console.log("Error verifying token");
      return res.status(401).json({
        message: 'Error verifying token'
      });
    }


  }else{
    next();
  }
}

app.use(auth);





app.get('/', (req, res) => {
    res.send('Hello World');
})



// Authentication
app.post('/api/auth/register', (req, res) => {
    register(req, res);
})
app.post('/api/auth/login', (req, res) => {
    login(req, res);
})


// Booking
app.post('/api/booking', (req, res) => {
    createBooking(req, res);
})

app.get('/api/bookings/user/:email', (req, res) => {
  getBooking(req, res);
});

app.delete('/api/bookings/:id', (req, res) => { 
  deleteBooking(req, res);
});

app.put('/api/bookings/update/:id', (req, res) => { 
  updateBooking(req, res);
});

// Tour


app.get('/api/tours/:id', (req, res) => {
    getSingleTour(req, res);
})
app.get('/api/tours', (req, res) => {
    getAllTour(req, res);
})
app.get('/api/tours/search/getTourBySearch', (req, res) => {
    getTourBySearch(req, res);
})
app.get('/api/tours/search/getFeaturedTour', (req, res) => {
    getFeaturedTour(req, res);
})
app.get('/api/tours/search/getTourCount', (req, res) => {
    getTourCount(req, res);
})

// Review

app.post('/api/tours/reviews/:tourId', 
(req, res) => {
    createReview(req, res);
})






app.listen(port, () => {
    connect();
    console.log('runs', port);
})