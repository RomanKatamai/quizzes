import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultCardComponent } from './result-card.component';
import { Component, Input } from '@angular/core';
import { Card } from '../../shared/interfaces';

@Component({ selector: 'app-mock-card', template: '' })
class MockCardComponent {
  @Input() card!: Card;
}

describe('ResultCardComponent', () => {
  let component: ResultCardComponent;
  let fixture: ComponentFixture<ResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCardComponent);
    component = fixture.componentInstance;
    component.card = {
      id: '1',
      title: 'Test Card',
      correct_answer: 5,
      percent: 80,
      time: '10:30',
      date: new Date('2024-03-19'),
      quantity: 10
    };
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept an input card', () => {
    expect(component.card).toBeDefined();
    expect(component.card.title).toBe('Test Card');
  });
  
});
