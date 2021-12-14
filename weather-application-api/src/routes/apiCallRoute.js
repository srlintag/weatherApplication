const express = require('express')
const router = express.Router()

const apiCallService = require('../services/apiCallService');

router.get('/getCityInformation', async function (req , res, next) {
    var data = encodeURI(req.query.location);
    try{
        let startCall = await apiCallService.getCityInformation(data);
        res.send(startCall); 
    } catch (error) {
        next (error);
        console.log("City Information Call Failed: ", error);
        res.send(error);
    }
})

router.get('/getCurrentWeather', async function (req , res, next) {
    var data = encodeURI(req.query.locationKey);
    try{
        let startCall = await apiCallService.getCurrentWeather(data);
        res.send(startCall);  
    } catch (error) {
        next (error);
        console.log("Current Weather Call Failed: ", error);
        res.send(error);
    }
})

router.get('/getFiveDayForecast', async function (req , res, next) {
    var data = encodeURI(req.query.locationKey);
    try{
        let startCall = await apiCallService.getFiveDayForecast(data);
        res.send(startCall);  
    } catch (error) {
        next (error);
        console.log("Forecast Call Failed: ", error);
        res.send(error);
    }
})


module.exports = router;