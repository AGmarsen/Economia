import { Loan } from './loan';

describe('Loan', () => {
  it('should create an instance', () => {
    expect(new Loan("Test Loan", 0, 0)).toBeTruthy();
  });
});
