const https = require('https');
const dotenv = require('dotenv');
const axios = require ('axios');
dotenv.config({ path: '../../.env' });
const accuURI = process.env.accuURI;
const apiKey = process.env.accuWeatherSecret;
var cityInformation={};

createForecastModel =  function (resp, int){
    var forecastModel = {};

    forecastModel.date = resp[int].Date;
    forecastModel.tempMax = resp[int].Temperature.Maximum.Value;
    forecastModel.tempMin = resp[int].Temperature.Minimum.Value;
    forecastModel.dayIcon = resp[int].Day.Icon;
    forecastModel.dayPhrase = resp[int].Day.IconPhrase;

    return forecastModel; 
}

exports.getFiveDayForecast = async function (data) {
    var fiveDayForecastModel = [];
    var path = accuURI + '/forecasts/v1/daily/5day/'+data+'?apikey='+apiKey+'&language=en-us&details=false';

    var errorMsg;

    let res = await axios.get(path).catch(function(error){
        if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMsg = error.response.status;
        }
    });

    let info = res.data.DailyForecasts;

    if(errorMsg){
        fiveDayForecastModel = errorMsg;
    } else {
        for(var i = 0; i < info.length; i++){
            fiveDayForecastModel.push(createForecastModel(info, i));
        }
    }


    return fiveDayForecastModel;
}

createWeatherModel =  function (resp, int){
    var weatherModel = {};
    
    weatherModel.time = resp[int].LocalObservationDateTime;
    weatherModel.weatherText = resp[int].WeatherText;
    weatherModel.temperatureF = resp[int].Temperature.Imperial.Value;
    weatherModel.temperatureC = resp[int].Temperature.Metric.Value;
    weatherModel.realTempF = resp[int].RealFeelTemperature.Imperial.Value;
    weatherModel.realTempC = resp[int].RealFeelTemperature.Metric.Value;
    weatherModel.weatherIcon = resp[int].WeatherIcon;

    return weatherModel; 
}


exports.getCurrentWeather = async function (data) {
    var currentWeatherModel = [];
    var path = accuURI + '/currentconditions/v1/'+data+'?apikey='+apiKey+'&language=en-us&details=true';

    var errorMsg;

    let res = await axios.get(path).catch(function(error){
        if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMsg = error.response.status;
        }
    });

    let info = res.data;

    var int = 0;

    if(errorMsg){
        currentWeatherModel = errorMsg;
    } else {
        currentWeatherModel.push(createWeatherModel(info, int));
    }

    return currentWeatherModel;
}

exports.getCityInformation = async function (data) {
    var path = accuURI + '/locations/v1/search?apikey='+apiKey+'&q='+data;

    var errorMsg;

    let res = await axios.get(path).catch(function(error){
        if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMsg = error.response.status;
        }
    });

    let info = res.data;

    if(errorMsg){
        cityInformation = errorMsg;
    } else {
        cityInformation.cityName = info[0].LocalizedName;
        cityInformation.cityState = info[0].AdministrativeArea.LocalizedName; 
        cityInformation.cityCountry = info[0].Country.ID;
        cityInformation.locationKey = info[0].Key;
    }

    return cityInformation;
}
