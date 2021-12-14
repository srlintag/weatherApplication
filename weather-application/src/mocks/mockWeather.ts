
 const userInput=72116;
 
 const currentWeatherModel=[{
        "time": "Dec 13, 2021, 3:23:00 PM",
        "weatherText": "Cloudy",
        "temperatureF": 68,
        "temperatureC": 20,
        "realTempF": 68,
        "realTempC": 19.8,
        "hasPrecipitation": false,
        "weatherIcon": 7
    }];
    
const cityInformation = {
        "cityName": "San Antonio",
        "cityState": "Texas",
        "cityCountry": "US",
        "locationKey": "351198"
    };

const fiveDayForecastModel = [
    {
        "date": "Monday, December 13",
        "tempMax": 66,
        "tempMin": 57,
        "dayIcon": 7,
        "dayPhrase": "Cloudy"
    },
    {
        "date": "Tuesday, December 14",
        "tempMax": 77,
        "tempMin": 64,
        "dayIcon": 13,
        "dayPhrase": "Mostly cloudy w/ showers"
    },
    {
        "date": "Wednesday, December 15",
        "tempMax": 83,
        "tempMin": 68,
        "dayIcon": 4,
        "dayPhrase": "Intermittent clouds"
    },
    {
        "date": "Thursday, December 16",
        "tempMax": 81,
        "tempMin": 64,
        "dayIcon": 8,
        "dayPhrase": "Dreary"
    },
    {
        "date": "Friday, December 17",
        "tempMax": 82,
        "tempMin": 62,
        "dayIcon": 6,
        "dayPhrase": "Mostly cloudy"
    }
];

export { userInput, currentWeatherModel, cityInformation, fiveDayForecastModel};