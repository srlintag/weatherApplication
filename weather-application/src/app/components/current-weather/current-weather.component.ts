import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

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

  constructor(
    private userLocationService: UserLocationService,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
      this.getLocationKey();
  }

  getLocationKey(){
      this.userLocationService.getCityInformation().subscribe((data:any) => { 
        this.cityInfo = data;
        this.locationKey = data.locationKey;
        this.getCurrentWeather(this.locationKey);
      });;
  }

  getCurrentWeather(data:any){
      this.userLocationService.getCurrentWeather(data)
        .subscribe(res => { 
          this.currentWeatherResp = res;
          this.displayCurrentWeather();
        });
  }

  displayCurrentWeather(){
      this.displayWeatherIcon(this.currentWeatherResp);
      this.currentWeatherResp[0].time = this.datePipe.transform(this.currentWeatherResp[0].time, "MMM d, h:mm a");
      this.showCard = true;
  }

  displayWeatherIcon(model: any){
    var weatherIconImgName; 
    if(model[0].weatherIcon < 10){
      weatherIconImgName = model[0].weatherIcon.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    }
    else{
      weatherIconImgName = model[0].weatherIcon;
    }
    this.weatherIconImgPath = '../../assets/weather-icons/'+weatherIconImgName+'-s.png';
  }

  ngOnDestroy() {
    this.currentWeatherResp.unsubscribe();
 }

}
