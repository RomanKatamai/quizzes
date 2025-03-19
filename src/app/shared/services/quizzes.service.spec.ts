import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizzesService } from './quizzes.service';
import { environment } from '../../../environments/environment';
import { Test, TriviaCategories } from '../interfaces';

describe('QuizzesService', () => {
  let service: QuizzesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizzesService],
    });

    service = TestBed.inject(QuizzesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get categories', () => {
    const mockCategories: TriviaCategories = {
      trivia_categories: [
        { id: 9, name: 'General Knowledge' },
        { id: 10, name: 'Entertainment: Books' },
      ],
    };

    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${environment.DBUrl}_category.php`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should get tests', () => {
    const mockTests: Test = {
      title: 'General Knowledge',
      quantity: 10,
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      incorrect_answers: [],
    };

    const categoryId = 9;
    const quantity = 10;

    service.getTests(categoryId, quantity).subscribe((tests) => {
      expect(tests).toEqual(mockTests);
    });

    const req = httpMock.expectOne(
      `${environment.DBUrl}.php?amount=${quantity}&category=${categoryId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTests);
  });

});
