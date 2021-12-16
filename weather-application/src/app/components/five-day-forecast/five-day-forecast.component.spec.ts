import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { FiveDayForecastComponent } from './five-day-forecast.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import {cityInformation, fiveDayForecastModel, locationKey} from '../../../mocks/mockWeather'
import { UserLocationService } from '../../services/user-location.service';

describe('FiveDayForecastComponent', () => {
  let component: FiveDayForecastComponent;
  let fixture: ComponentFixture<FiveDayForecastComponent>;
  let service: UserLocationService;
  let spy: any;
  let model = fiveDayForecastModel[0];

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
    });
});
