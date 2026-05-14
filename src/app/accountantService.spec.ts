import { TestBed } from '@angular/core/testing';

import { AccountantService } from './accountantService';

describe('Accountant', () => {
  let service: AccountantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
