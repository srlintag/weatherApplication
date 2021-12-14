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
  showForecast: boolean = false; 
  showCurrentWeather: boolean = false; 
  submitted: boolean = false;

  //autoLocations: string[] = ['Little Rock', 'Chicago', 'San Francisco'];

  constructor(
    private userLocationService: UserLocationService
  ) {}

  ngOnInit(): void {

  }

  submitForm(){
    this.userInput = this.userLocInput.value;
    this.userLocationService.setNewCityInformation(this.userInput).subscribe(info=>{
    this.showWeather();
    });
  }

  isValid() {
    this.showCurrentWeather = false;
    this.showForecast = false; 
    
    if(this.userLocInput.valid){
      this.submitted = false;
      this.submitForm();
    }
    else{
      this.submitted = true;
    }
  }

  showWeather(){
    this.showCurrentWeather = true;
    this.showForecast = true; 
  }

}
