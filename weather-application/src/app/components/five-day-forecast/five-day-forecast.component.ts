import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

//Services
import { UserLocationService } from '../../services/user-location.service';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.css']
})
export class FiveDayForecastComponent implements OnInit {

  forecastResp: any; 
  weatherIconImgPath: any; 
  showCard: boolean=false;
  dayIconPaths: string []= [];
  serverError: boolean = false; 

  constructor(    
    private userLocationService: UserLocationService,
    public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getLocationKey();
  }

  getLocationKey(){
    this.serverError = false;
    this.userLocationService.getCityInformation().subscribe((data:any) => { 
      if(data === "An error has occured, please try again later."  || data === undefined ){
        this.serverError = true; 
        this.showCard = false;
      }
      else
      {
        this.serverError = false;
        this.getFiveDayForecast(data.locationKey);
      }
    },
    err => { 
      if(err){
        this.serverError = true;
      }
    });
  }

  getFiveDayForecast(data:any){
    this.serverError = false;
    this.userLocationService.getFiveDayForecast(data)
      .subscribe((res:any) => { 
        if(res === "An error has occured, please try again later."  || res === undefined ){
          this.serverError = true; 
          this.showCard = false;
        }
        else{
          this.forecastResp = res;
          this.displayForecast(this.forecastResp);
        }
    }, err => { 
        if(err){
          this.serverError = true;
          console.log(err);
        }
      });
  }

  displayForecast(model:any){
    this.dayIconPaths.length = 0;
    for(var i = 0; i < model.length; i++){
      model[i].date = this.datePipe.transform(model[i].date, "EEEE, MMMM d");
      this.pathDayWeatherIcon(model[i]);
    }

    this.showCard = true;
  }

  pathDayWeatherIcon(model: any){
    var weatherIconImgName;
    var iconPath;

    if(model.dayIcon < 10){
      weatherIconImgName = model.dayIcon.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    }
    else{
      weatherIconImgName = model.dayIcon;
    }
    iconPath = "../../assets/weather-icons/"+weatherIconImgName+"-s.png";

    this.dayIconPaths.push(iconPath);
}

}
