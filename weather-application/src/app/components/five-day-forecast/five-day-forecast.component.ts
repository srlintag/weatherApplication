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
	weatherIconImgPath = ''; 
	showCard = false;
	dayIconPaths: string []= [];
	serverError = false; 
	cityInfo: any;
	locationKey = '';

	constructor(
    private userLocationService: UserLocationService,
    public datePipe: DatePipe) { }

	ngOnInit(): void {
		this.getLocationKey();
	}

	getLocationKey(){
		this.serverError = false;
		this.userLocationService.getCityInformation().subscribe((data:unknown) => { 
			if(data === 'An error has occured, please try again later.'  || data === undefined ){
				this.serverError = true; 
				this.showCard = false;
			}
			else
			{
				this.serverError = false;
				this.cityInfo = data;
				this.locationKey = this.cityInfo.locationKey;
				this.getFiveDayForecast(this.locationKey);
			}
		},
		err => { 
			if(err){
				this.serverError = true;
			}
		});
	}

	getFiveDayForecast(data:string){
		this.serverError = false;
		this.userLocationService.getFiveDayForecast(data)
			.subscribe((res) => { 
				if(res === 'An error has occured, please try again later.'  || res === undefined ){
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
		for(let i = 0; i < model.length; i++){
			model[i].date = this.datePipe.transform(model[i].date, 'EEEE, MMMM d');
			this.pathDayWeatherIcon(model[i]);
		}

		this.showCard = true;
	}

	pathDayWeatherIcon(model: any){
		let weatherIconImgName;

		if(model.dayIcon < 10){
			weatherIconImgName = model.dayIcon.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
		}
		else{
			weatherIconImgName = model.dayIcon;
		}
		const iconPath = '../../assets/weather-icons/'+weatherIconImgName+'-s.png';

		this.dayIconPaths.push(iconPath);
	}

}
