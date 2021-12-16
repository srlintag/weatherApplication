const https = require('https');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
const accuURI = process.env.accuURI;
const apiKey = process.env.accuWeatherSecret;


createForecastModel =  function (resp, int){
    var forecastModel = {};

    forecastModel.date = resp[int].Date;
    forecastModel.tempMax = resp[int].Temperature.Maximum.Value;
    forecastModel.tempMin = resp[int].Temperature.Minimum.Value;
    forecastModel.dayIcon = resp[int].Day.Icon;
    forecastModel.dayPhrase = resp[int].Day.IconPhrase;

    return forecastModel; 
}

exports.getFiveDayForecast = async function (info) {
    var fiveDayForecastModel = [];
    var path = accuURI + '/forecasts/v1/daily/5day/'+info+'?apikey='+apiKey+'&language=en-us&details=false';
    let data = [];

    return new Promise((resolve, reject) => {
        https.get(path, function (res) {    
           res.on('data',  chunk => {
                data.push(chunk);
            });
             res.on('end', function () {
                const response = JSON.parse(Buffer.concat(data).toString());
                forecasts = response.DailyForecasts;
                for(var i = 0; i < forecasts.length; i++){
                    fiveDayForecastModel.push(createForecastModel(forecasts, i));
                }
            resolve(fiveDayForecastModel);
          });
          res.on('error', (err) => {
            console.log(err);
            reject(err);
          })
        });
      });
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


exports.getCurrentWeather = async function (info) {
    var currentWeatherModel = [];
    var path = accuURI + '/currentconditions/v1/'+info+'?apikey='+apiKey+'&language=en-us&details=true';
    let data = [];

    return new Promise((resolve, reject) => {
        https.get(path, function (res) {    
            res.on('data',  chunk => {
                data.push(chunk);
             });
             res.on('end', function () {
               const response = JSON.parse(Buffer.concat(data).toString());
                var int = 0;
                currentWeatherModel.push(createWeatherModel(response, int));
             resolve(currentWeatherModel);
          });
          res.on('error', (err) => {
            console.log(err);
            reject(err);
          })
        });
      });
}

exports.getCityInformation = async function (info) {
    var path = accuURI + '/locations/v1/cities/search?apikey='+apiKey+'&q='+info+'&details=false';
    var cityInformation={};
    let data = [];

    return new Promise((resolve, reject) => {
      https.get(path, function (res) {    
        res.on('data',  chunk => {
           data.push(chunk);
        });
        res.on('end', function () {
          const response = JSON.parse(Buffer.concat(data).toString());

          cityInformation.cityName = response[0].LocalizedName;
          cityInformation.cityState = response[0].AdministrativeArea.LocalizedName; 
          cityInformation.cityCountry = response[0].Country.ID;
          cityInformation.locationKey = response[0].Key;

          resolve(cityInformation);
        });
        res.on('error', (err) => {
          console.log(err);
          reject(err);
        })
      });
    });
}
