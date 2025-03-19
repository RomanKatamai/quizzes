import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardsService } from './cards.service';
import { environmentFireBase } from '../../../environments/environment';
import { Card, FBCreateResponse } from '../interfaces';

describe('CardsService', () => {
  let service: CardsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardsService]
    });
    service = TestBed.inject(CardsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a card', () => {
    const mockCard: Card = {
      title: 'Test Card',
      correct_answer: 5,
      percent: 80,
      time: '10:00',
      date: new Date(),
      quantity: 10
    };
    const mockResponse: FBCreateResponse = { name: 'generated-id' };

    service.create(mockCard).subscribe((card) => {
      expect(card).toEqual(mockCard);
    });

    const req = httpMock.expectOne(`${environmentFireBase.FbDBUrl}/cards.json`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get a card by id', () => {
    const mockId = '1';
    const mockCards: Card[] = [
      {
        id: '1',
        title: 'Test Card',
        correct_answer: 5,
        percent: 80,
        time: '10:00',
        date: new Date(),
        quantity: 10
      }
    ];

    service.getById(mockId).subscribe((cards) => {
      expect(cards).toEqual(mockCards);
    });

    const req = httpMock.expectOne(`${environmentFireBase.FbDBUrl}/cards.json?orderBy=%22id%22&equalTo=%22${mockId}%22`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });
});
