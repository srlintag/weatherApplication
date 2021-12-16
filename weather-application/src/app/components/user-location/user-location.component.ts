import { Component, OnInit } from '@angular/core';
import { FormControl, RangeValueAccessor, Validators } from '@angular/forms';

//Services
import { UserLocationService } from '../../services/user-location.service';

@Component({
	selector: 'app-user-location',
	templateUrl: './user-location.component.html',
	styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit {

	cityName ='';
	userLocInput = new FormControl('', [Validators.required]);
	locations: any;
	locationId: any;
	userInput: any;
	cityInfoResp: any;
	showFiveDayForecast = false; 
	showCurrentWeather = false; 
	submitted = false;
	serverError = false; 

	//autoLocations: string[] = ['Little Rock', 'Chicago', 'San Francisco'];

	constructor(
    private userLocationService: UserLocationService
	) {}

	ngOnInit(): void {

	}

	submitForm(input:any){
		this.serverError = false;
		this.userLocationService.setNewCityInformation(input).subscribe((info:any)=>{
			this.showWeather();
		},
		err => { 
			if(err){
				this.serverError = true;
			}
		});
	}

	isValid(input:any) {   
		if(input.valid){
			this.submitted = false;
			this.submitForm(input.value);
		}
		else{
			this.submitted = true;
		}
	}

	showWeather(){
		this.serverError = false; 
		this.showCurrentWeather = true;
		this.showFiveDayForecast = true; 
	}



}
