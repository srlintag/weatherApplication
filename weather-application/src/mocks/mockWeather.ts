
 const userInput="Little Rock";
 const locationKey="326862";
 
 const currentWeatherModel=[{
    "time": "2021-12-15T16:33:00-06:00",
    "weatherText": "Mostly cloudy",
    "temperatureF": 71,
    "temperatureC": 21.7,
    "realTempF": 68,
    "realTempC": 20,
    "weatherIcon": 6
  }];

const cityInformation = {
  "cityName": "Little Rock",
  "cityState": "Arkansas",
  "cityCountry": "US",
  "locationKey": "326862"
}

const fiveDayForecastModel = [
    {
        "date": "2021-12-15T07:00:00-06:00",
        "tempMax": 69,
        "tempMin": 66,
        "dayIcon": 6,
        "dayPhrase": "Mostly cloudy"
    },
    {
        "date": "2021-12-16T07:00:00-06:00",
        "tempMax": 72,
        "tempMin": 54,
        "dayIcon": 18,
        "dayPhrase": "Rain"
    },
    {
        "date": "2021-12-17T07:00:00-06:00",
        "tempMax": 71,
        "tempMin": 54,
        "dayIcon": 15,
        "dayPhrase": "Thunderstorms"
    },
    {
        "date": "2021-12-18T07:00:00-06:00",
        "tempMax": 57,
        "tempMin": 28,
        "dayIcon": 15,
        "dayPhrase": "Thunderstorms"
    },
    {
        "date": "2021-12-19T07:00:00-06:00",
        "tempMax": 40,
        "tempMin": 25,
        "dayIcon": 3,
        "dayPhrase": "Partly sunny"
    }
];

export { userInput, locationKey, currentWeatherModel, cityInformation, fiveDayForecastModel};