import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserLocationService } from './user-location.service';
import { cityInformation, userInput, locationKey, currentWeatherModel, fiveDayForecastModel } from '../../mocks/mockWeather';

describe('UserLocationService', () => {
	let service: UserLocationService;
	let httpTestingController: HttpTestingController;
	const localUrl = 'http://localhost:8080';

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		service = TestBed.inject(UserLocationService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should getCityInformation', () => {
		service.getCityInformation().subscribe(data =>{
			expect(data).toEqual(cityInformation);
		});
	});

	it('should getCurrentWeather', () => {
		service.getCurrentWeather(locationKey).subscribe(data =>{
			expect(data).toEqual(currentWeatherModel);
		});
		const req = httpTestingController.expectOne({
			method: 'GET',
			url: localUrl + '/api-calls/getCurrentWeather?locationKey='+locationKey
		});
		req.flush(currentWeatherModel);
	});

	it('should getFiveDayForecast', () => {
		service.getFiveDayForecast(locationKey).subscribe(data =>{
			expect(data).toEqual(fiveDayForecastModel);
		});
		const req = httpTestingController.expectOne({
			method: 'GET',
			url: localUrl + '/api-calls/getFiveDayForecast?locationKey='+locationKey
		});
		req.flush(fiveDayForecastModel);
	});

	it('should call setNewCityInformation and then call setCityInformation', () => {
		service.setNewCityInformation(userInput).subscribe(data => {
			expect(data).toEqual(service.currentInfo);
		});
	});

});
