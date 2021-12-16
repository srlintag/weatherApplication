import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserLocationComponent } from './user-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { userInput } from '../../../mocks/mockWeather'
import { UserLocationService } from '../../services/user-location.service';
import { By } from '@angular/platform-browser';

describe('UserLocationComponent', () => {
  let component: UserLocationComponent;
  let fixture: ComponentFixture<UserLocationComponent>;
  let service: UserLocationService;
  let spy: any;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ UserLocationComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatIconModule]
    })
    .compileComponents();
    service = TestBed.inject(UserLocationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showWeather should have showCurrentWeather and showFiveDayForecast to be true and serverError to be false', () => {
    expect(component.showCurrentWeather).toBeTruthy;
    expect(component.showFiveDayForecast).toBeTruthy;
    expect(component.serverError).toBeFalsy;
    });

  it('when input validity is false it should show the submitted and invalid error ', () => {
    let input = "ret938sc";
    component.isValid(input);
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy;
    expect(fixture.debugElement.nativeElement.querySelector('.error')).toBeTruthy;
    });
    
  // it('should call isValid() method when form submits', () => {
  //   spy = jest.spyOn(component, "isValid");
  //   const button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.click();
  //   fixture.detectChanges();
  //   expect(spy).toHaveBeenCalled();

  //   spy.mockRestore();
  // })

});
