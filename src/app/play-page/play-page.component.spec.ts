import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PlayPageComponent } from './play-page.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('PlayPageComponent', () => {
  let component: PlayPageComponent;
  let fixture: ComponentFixture<PlayPageComponent>;
  let router: MockRouter;

  const mockQuiz = {
    title: 'Sample Quiz',
    results: [
      { title: 'test 1', quantity: 21, type: '...', difficulty: 'easy', category: 'History', question: 'Question 1', correct_answer: 'Correct 1', incorrect_answers: ['Wrong 1', 'Wrong 2', 'Wrong 3'], answers: [] },
      { title: 'test 2', quantity: 31, type: '...', difficulty: 'hard', category: 'History', question: 'Question 2', correct_answer: 'Correct 2', incorrect_answers: ['Wrong 1', 'Wrong 2', 'Wrong 3'], answers: [] }
    ],
    quantity: 2
  };

  beforeEach(async () => {
    router = new MockRouter();
    await TestBed.configureTestingModule({
      declarations: [PlayPageComponent],
      providers: [{ provide: Router, useValue: router }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayPageComponent);
    component = fixture.componentInstance;

    localStorage.setItem('test', JSON.stringify(mockQuiz));
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('test');
    localStorage.removeItem('points');
    localStorage.removeItem('time-spent');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize quiz data from localStorage', () => {
    expect(component.title).toBe('Sample Quiz');
    expect(component.tests.length).toBe(2);
    expect(component.quantity).toBe(2);
  });

  it('should navigate to error page if quiz data is missing', () => {
    localStorage.removeItem('test');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/error']);
  });

  it('should randomize answers', () => {
    component.tests[0].answers = [...mockQuiz.results[0].incorrect_answers, mockQuiz.results[0].correct_answer];
    const originalOrder = [...component.tests[0].answers];
    component.randomizeAnswers();
    expect(component.tests[0].answers).not.toEqual(originalOrder);
  });

  it('should increment points when the correct answer is selected', () => {
    component.points = 0;
    component.calculatePoints(mockQuiz.results[0].correct_answer);
    expect(component.points).toBe(1);
  });

  it('should not increment points for incorrect answers', () => {
    component.points = 0;
    component.calculatePoints('Wrong Answer');
    expect(component.points).toBe(0);
  });

  it('should navigate to finish page when last question is answered', fakeAsync(() => {
    component.index = 1;
    component.tests = mockQuiz.results;
    component.calculatePoints(component.tests[1].correct_answer);
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/finish']);
  }));

  it('should store time spent in localStorage on finish', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    component.stopTime();
    tick();
    expect(localStorage.setItem).toHaveBeenCalledWith(jasmine.stringMatching('time-spent'), jasmine.any(String));
  }));

  it('should clear localStorage on closing', () => {
    component.closing();
    expect(localStorage.getItem('test')).toBeNull();
  });
});
