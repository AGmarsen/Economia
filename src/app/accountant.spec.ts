import { TestBed } from '@angular/core/testing';

import { Accountant } from './accountant';

describe('Accountant', () => {
  let service: Accountant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Accountant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
