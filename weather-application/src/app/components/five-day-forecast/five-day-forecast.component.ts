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

  showForecast: boolean = false; 
  forecastResp: any; 
  forecastModel: any; 
  weatherIconImgPath: any; 
  cityName: string = '';
  locationKey: any; 
  showCard: boolean=false;
  dayIconPaths: string []= [];

  constructor(    
    private userLocationService: UserLocationService,
    public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getLocationKey();
  }

  getLocationKey(){
    this.userLocationService.getCityInformation().subscribe((data:any) => { 
      this.locationKey = data.locationKey;
      this.getFiveDayForecast(this.locationKey);
    });;
  }

  getFiveDayForecast(data:any){
    this.userLocationService.getFiveDayForecast(data)
      .subscribe(res => { 
        this.forecastResp = res;
        this.displayForecast(this.forecastResp);
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

ngOnDestroy() {
  this.forecastResp.unsubscribe();
}



}
