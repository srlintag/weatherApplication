import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { DatePipe } from '@angular/common';
import {cityInformation, currentWeatherModel, locationKey} from '../../../mocks/mockWeather'
import { UserLocationService } from '../../services/user-location.service';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let service: UserLocationService;
  let spy: any;
  let model = currentWeatherModel[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent ],
      imports: [HttpClientTestingModule],
      providers:[DatePipe]
    })
    .compileComponents();
    service = TestBed.inject(UserLocationService);
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCurrentWeather function', () => {
    spy = jest.spyOn(service, 'getCurrentWeather');
    component.getCurrentWeather(locationKey);
    expect(spy).toHaveBeenCalled;
    spy.mockRestore();
    });

  it('serverError should be false for getLocationKey', () =>{
    component.getLocationKey();
    fixture.detectChanges();
    expect(component.serverError).toBeFalsy;
  });

  it('should do getLocationKey function', () => {
    spy = jest.spyOn(service, 'getCityInformation');
    component.getLocationKey();
    expect(spy).toHaveBeenCalled;
    spy.mockRestore();
  });

  it('should have serverError be false for getCurrentWeather', () =>{
    component.getCurrentWeather(locationKey);
    fixture.detectChanges();
    expect(component.serverError).toBeFalsy;
  });

  it('should call displayWeatherIcon from displayCurrentWeather ', () => {
    component.displayCurrentWeather(model);
    expect(component.displayWeatherIcon).toHaveBeenCalled;
  });

  it('should set showCard to true and change model time', () => {
    component.displayCurrentWeather(model);
    component.currentWeatherResp = model;
    component.cityInfo = cityInformation;
    fixture.detectChanges();
    expect(component.showCard).toBeTruthy; 
    expect(model.time).toEqual("Dec 15, 4:33 PM");
  });
  
  it('should set the path to the weather icon', () => {
    component.displayWeatherIcon(model);
    component.showCard = true;
    expect(component.weatherIconImgPath).toEqual("../../assets/weather-icons/06-s.png");
  });

});
