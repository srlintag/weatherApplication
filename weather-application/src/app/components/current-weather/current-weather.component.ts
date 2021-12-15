import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

//Services
import { UserLocationService } from '../../services/user-location.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  showCurrentWeather: boolean = false; 
  currentWeatherResp: any; 
  currentWeatherModel: any; 
  weatherIconImgPath: any; 
  cityInfo: any;
  locationKey:any;
  showCard:boolean=false;
  serverError: boolean=false; 

  constructor(
    private userLocationService: UserLocationService,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
      this.getLocationKey();
  }

  getLocationKey(){
    this.serverError = false;
      this.userLocationService.getCityInformation().subscribe((data:any) => { 
        if( Object.keys(data).length === 0 || data == undefined){
          this.serverError = true;
          this.showCard = false;
        }
        else
        {
          this.cityInfo = data;
          this.locationKey = data.locationKey;
          this.getCurrentWeather(this.locationKey);
        }},
      err => { 
        if(err){
          this.serverError = true;
          console.log(err);
        }
      });
  }

  getCurrentWeather(data:any){
    this.serverError = false;
      this.userLocationService.getCurrentWeather(data)
        .subscribe((res:any) => { 
          if(Object.keys(res).length === 0|| res === undefined){
            this.serverError = true; 
            this.showCard = false;
          }
          else{
            this.currentWeatherResp = res[0];
            this.displayCurrentWeather(this.currentWeatherResp);
          }},
      err => { 
        if(err){
          this.serverError = true;
          console.log(err);
        }
      });
  }

  displayCurrentWeather(model: any){
      this.displayWeatherIcon(model);
      model.time = this.datePipe.transform(model.time, "MMM d, h:mm a");
      this.showCard = true;
  }

  displayWeatherIcon(model: any){
    var weatherIconImgName; 
    if(model.weatherIcon < 10){
      weatherIconImgName = model.weatherIcon.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    }
    else{
      weatherIconImgName = model.weatherIcon;
    }
    this.weatherIconImgPath = '../../assets/weather-icons/'+weatherIconImgName+'-s.png';
  }

}
