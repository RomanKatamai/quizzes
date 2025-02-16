import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPageComponent } from './user-page.component';

describe('UserPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryPageComponent]
    });
    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
