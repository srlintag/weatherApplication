# weatherApplication

Weather Application written in Angular/Typescript with a Node.js / Express.js server. [AccuWeather APIs](https://developer.accuweather.com/apis) used to detect current weather and forecasted weather at a specified location. Unit tests ran in JEST.

In a terminal with NPM, run: 

`npm install -g @angular/cli`

`npm install` inside both folders

Then do `npm start` in the root of both folders to start the UI and server. 

weather-application (UI) + weather-application-api (Server-side)

weather-application	
To start the JEST unit tests, use `npx jest`. All unit tests are located inside .spec.ts files
- app.component.spect.ts
- user-location.spec.ts
- footer.component.spec.ts
- five-day-forecast.component.spec.ts
- current-weather.component.spec.ts

Mock data is inside src/mocks
