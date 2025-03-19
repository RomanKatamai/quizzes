import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from "./card.component";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should save test data to localStorage', () => {
    const mockTest = {
      title: 'General Knowledge',
      quantity: 10,
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      incorrect_answers: [] as [],
    };
    component.test = mockTest;

    spyOn(localStorage, 'setItem');
    component.startQuiz();

    expect(localStorage.setItem).toHaveBeenCalledWith('test', JSON.stringify(mockTest));
  });
});
