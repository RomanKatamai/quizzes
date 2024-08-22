import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPageComponent } from './result-page.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultPageComponent],
      imports: [RouterTestingModule ]
    });
    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('quantity', '10');
    localStorage.setItem('points', JSON.stringify({ points: 10 }));
    localStorage.setItem('time-spent', JSON.stringify('fdklgfdjg'));
  });

  xit('should clear localStorage data', () => {
      component.clearData()
    console.log(localStorage)
    expect(localStorage.getItem('test')).toBeNull()
    expect(localStorage.getItem('points')).toBeNull()
    expect(localStorage.getItem('time-spent')).toBeNull()
  });

});
