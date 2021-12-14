import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

//Services
import { UserLocationService } from '../../services/user-location.service';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit {

  cityName: string ='';
  userLocInput = new FormControl();
  locations: any;
  locationId: any;
  userInput: any;
  cityInfoResp: any;
  showForecast: boolean = false; 
  showCurrentWeather: boolean = false; 

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
    if(this.userLocInput.valid){
      this.submitForm();
    }
  }

  showWeather(){
    this.showCurrentWeather = true;
    this.showForecast=true; 
  }
}
