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
	private cityInfo =  new BehaviorSubject<Object>({});
	currentInfo = this.cityInfo.asObservable();

	constructor(
    private http: HttpClient,
	) { }

	private cityInformationURI = environment.localUrl + '/api-calls/getCityInformation';
	private currentWeatherURI = environment.localUrl + '/api-calls/getCurrentWeather';
	private fiveDayForecastURI = environment.localUrl + '/api-calls/getFiveDayForecast';
  
	private setCityInformation(data:any){
		this.cityInfo.next(data);
	}

	public setNewCityInformation(query:any): Observable<any>{
		const params = new HttpParams().set('location', query);

		return this.http.get<any>(this.cityInformationURI,{params: params})
			.pipe(map((response: any) =>  this.setCityInformation(response),
				catchError( err => { 
					console.log('Error in City Information Service ', err);
					return throwError(() => new Error (err));
				} )));
	}

	public getCityInformation(){
		return this.currentInfo;   
	}

	public getCurrentWeather(data:any): Observable<any>{
		const params = new HttpParams().set('locationKey', data);
		return this.http.get<any>(this.currentWeatherURI,{params: params});
	}

	public getFiveDayForecast(data:any){
		const params = new HttpParams().set('locationKey', data);
		return this.http.get(this.fiveDayForecastURI, { params: params });
	}

}
