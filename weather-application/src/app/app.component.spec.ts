import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLocationComponent } from './components/user-location/user-location.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { FiveDayForecastComponent } from './components/five-day-forecast/five-day-forecast.component';
import { FooterComponent } from './components/footer/footer.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        UserLocationComponent,
        CurrentWeatherComponent,
        FiveDayForecastComponent,
        FooterComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Hey Sarah, what\'s the weather?'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Hey Sarah, what\'s the weather?');
  });

  it('should render title in h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hey Sarah, what\'s the weather?');
  });
});
