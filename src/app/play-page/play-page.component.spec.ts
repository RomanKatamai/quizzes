import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPageComponent } from './play-page.component';
import {TestComponent} from "./test/test.component";

describe('PlayPageComponent', () => {
  let component: PlayPageComponent;
  let fixture: ComponentFixture<PlayPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayPageComponent, TestComponent]
    });
    fixture = TestBed.createComponent(PlayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  xit('should ', () => {
    // expect(1).toBe(1)
  });
});
