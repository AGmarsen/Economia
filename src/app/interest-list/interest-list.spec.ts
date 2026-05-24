import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestList } from './interest-list';

describe('InterestList', () => {
  let component: InterestList;
  let fixture: ComponentFixture<InterestList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestList],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
