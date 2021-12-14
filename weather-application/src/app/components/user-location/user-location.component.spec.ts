import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserLocationComponent } from './user-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { UserLocationService } from '../../services/user-location.service';

describe('UserLocationComponent', () => {
  let component: UserLocationComponent;
  let fixture: ComponentFixture<UserLocationComponent>;

  beforeEach(async () => {

  const cityInformation = {
    cityCountry: "US",
    cityName: "North Little Rock",
    cityState: "Arkansas",
    locationKey: "31214_PC"
};

    await TestBed.configureTestingModule({
      declarations: [ UserLocationComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatIconModule],
      providers: [{provide: UserLocationService, useValue:cityInformation}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
