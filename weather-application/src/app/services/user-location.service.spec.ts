import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { UserLocationService } from './user-location.service';

describe('UserLocationService', () => {
  let service: UserLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
