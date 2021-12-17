import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserLocationService {

	//private cityInfo: BehaviorSubject <any> = new BehaviorSubject({locationKey:''});
	private cityInfo =  new BehaviorSubject<Record<string, unknown>>({});
	currentInfo = this.cityInfo.asObservable();

	constructor(
    private http: HttpClient,
	) { }

	private cityInformationURI = environment.localUrl + '/api-calls/getCityInformation';
	private currentWeatherURI = environment.localUrl + '/api-calls/getCurrentWeather';
	private fiveDayForecastURI = environment.localUrl + '/api-calls/getFiveDayForecast';
  
	private setCityInformation(data:Record<string, unknown>){
		this.cityInfo.next(data);
	}

	public setNewCityInformation(query:string): Observable<unknown>{
		const params = new HttpParams().set('location', query);

		return this.http.get<Record<string, unknown>>(this.cityInformationURI,{params: params})
			.pipe(map((response: Record<string, unknown>) =>  this.setCityInformation(response),
				catchError( err => { 
					console.log('Error in City Information Service ', err);
					return throwError(() => new Error (err));
				} )));
	}

	public getCityInformation(){
		return this.currentInfo;   
	}

	public getCurrentWeather(data:string){
		const params = new HttpParams().set('locationKey', data);
		return this.http.get(this.currentWeatherURI,{params: params});
	}

	public getFiveDayForecast(data:string){
		const params = new HttpParams().set('locationKey', data);
		return this.http.get(this.fiveDayForecastURI, { params: params });
	}

}
