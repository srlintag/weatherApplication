import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

//UI Components
import { UserLocationComponent } from './components/user-location/user-location.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { FiveDayForecastComponent } from './components/five-day-forecast/five-day-forecast.component';
import { FooterComponent } from './components/footer/footer.component';

import { UserLocationService } from './services/user-location.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    UserLocationComponent,
    CurrentWeatherComponent,
    FiveDayForecastComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    FlexLayoutModule
  ],
  providers: [
    UserLocationService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  exports: [
    UserLocationComponent,
    CurrentWeatherComponent,
    FiveDayForecastComponent,
    FooterComponent
  ]
})
export class AppModule { }
