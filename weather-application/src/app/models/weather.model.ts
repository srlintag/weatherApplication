export interface CurrentWeather {
time: string;
weatherText: string;
temperatureF: number;
temperatureC: number;
realTempF: number;
realTempC: number;
weatherIcon: number;
}

export interface forecast {
date: string;
tempMax: number;
tempMin: number;
dayIcon: number;
dayPhrase: string;    
}

export interface fiveDayForecast{
    
}

export interface city {
    cityName: string;
    cityState: string; 
    cityCountry: string;
    locationKey: string;
}
