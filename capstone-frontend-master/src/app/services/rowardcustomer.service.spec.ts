import { TestBed } from '@angular/core/testing';

import { RowardcustomerService } from './rowardcustomer.service';

describe('RowardcustomerService', () => {
  let service: RowardcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowardcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
