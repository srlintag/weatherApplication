import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
	userInput = '';
	cityInfoResp: any;
	showFiveDayForecast = false; 
	showCurrentWeather = false; 
	submitted = false;
	serverError = false; 

	//autoLocations: string[] = ['Little Rock', 'Chicago', 'San Francisco'];

	constructor(
    private userLocationService: UserLocationService
	) {}

	ngOnInit() {
		//required
	}

	submitForm(input:string){
		this.serverError = false;
		this.userLocationService.setNewCityInformation(input).subscribe(()=>{
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
