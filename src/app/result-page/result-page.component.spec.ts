import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultPageComponent } from './result-page.component';
import { AuthService } from '../shared/services/auth.service';
import { CardsService } from '../shared/services/cards.service';
import { of } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;
  let authServiceMock: any;
  let cardsServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      currentUserSig: jasmine.createSpy('currentUserSig').and.returnValue({ id: '123' })
    };

    cardsServiceMock = {
      create: jasmine.createSpy('create').and.returnValue(of(null))
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ResultPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CardsService, useValue: cardsServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('test', JSON.stringify({ quantity: 10, title: 'Test Title' }));
    localStorage.setItem('points', '7');
    localStorage.setItem('time-spent', '00:05:00');

    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.quantity).toBe(10);
    expect(component.points).toBe(7);
    expect(component.time).toBe('00:05:00');
    expect(component.percent).toBe(70);
    expect(component.id).toBe('123');
  });

  it('should create a card and call cardsService.create', () => {
    component.createCard();
    expect(cardsServiceMock.create).toHaveBeenCalledWith(jasmine.objectContaining({
      time: '00:05:00',
      percent: 70,
      correct_answer: 7,
      title: 'Test Title',
      id: '123',
      quantity: 10
    }));
  });

  it('should clear data from localStorage', () => {
    spyOn(localStorage, 'removeItem');
    component.clearData();
    expect(localStorage.removeItem).toHaveBeenCalledWith('test');
    expect(localStorage.removeItem).toHaveBeenCalledWith('points');
    expect(localStorage.removeItem).toHaveBeenCalledWith('time-spent');
  });

  it('should call createCard if fb-token is in localStorage', () => {
    spyOn(component, 'createCard');
    localStorage.setItem('fb-token', 'test-token');
    component.clearData();
    expect(component.createCard).toHaveBeenCalled();
  });
});
