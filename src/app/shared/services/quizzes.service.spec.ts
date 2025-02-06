import { TestBed } from '@angular/core/testing';

import { QuizzesService } from './quizzes.service';

describe('QuizzesService', () => {
  let service: QuizzesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzesService);

  });

  xit('should ', () => {
    expect(1).toBe(1)
  });
});
