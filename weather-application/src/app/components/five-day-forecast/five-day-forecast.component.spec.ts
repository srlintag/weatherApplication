import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { FiveDayForecastComponent } from './five-day-forecast.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { fiveDayForecastModel, locationKey} from '../../../mocks/mockWeather'
import { UserLocationService } from '../../services/user-location.service';

describe('FiveDayForecastComponent', () => {
  let component: FiveDayForecastComponent;
  let fixture: ComponentFixture<FiveDayForecastComponent>;
  let service: UserLocationService;
  let spy: any;
  let model = fiveDayForecastModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveDayForecastComponent ],
      imports:[HttpClientTestingModule],
      providers:[DatePipe]
    })
    .compileComponents();
    service = TestBed.inject(UserLocationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFiveDayForecast function', () => {
    spy = jest.spyOn(service, 'getFiveDayForecast');
    component.getFiveDayForecast(locationKey);
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
  
    it('should have serverError be false for getFiveDayForecast', () =>{
      component.getFiveDayForecast(locationKey);
      fixture.detectChanges();
      expect(component.serverError).toBeFalsy;
    });
  
    it('should call dayIconPaths from displayForecast ', () => {
      component.displayForecast(model);
      expect(component.dayIconPaths).toHaveBeenCalled;
    });
  
    it('should set showCard to true and change model date', () => {
      component.displayForecast(model);
      component.forecastResp = model;
      fixture.detectChanges();
      expect(component.showCard).toBeTruthy; 
      expect(model[0].date).toEqual("Saturday, December 15");
    });
    
    it('should set the path to the weather icon for the first item', () => {
      component.pathDayWeatherIcon(model[0]);
      component.showCard = true;
      expect(component.dayIconPaths[0]).toEqual("../../assets/weather-icons/06-s.png");
    });
  
});
