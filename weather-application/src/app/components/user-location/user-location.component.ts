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

  cityName: string ='';
  userLocInput = new FormControl('', [Validators.required]);
  locations: any;
  locationId: any;
  userInput: any;
  cityInfoResp: any;
  showFiveDayForecast: boolean = false; 
  showCurrentWeather: boolean = false; 
  submitted: boolean = false;
  serverError: boolean = false; 

  //autoLocations: string[] = ['Little Rock', 'Chicago', 'San Francisco'];

  constructor(
    private userLocationService: UserLocationService
  ) {}

  ngOnInit(): void {

  }

  submitForm(input:any){
    this.userLocationService.setNewCityInformation(input).subscribe((info:any)=>{
        this.showWeather();
    });
  }

  isValid() {
    this.showCurrentWeather = false;
    this.showFiveDayForecast = false; 
    
    if(this.userLocInput.valid){
      this.submitted = false;
      this.submitForm(this.userLocInput.value);
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
