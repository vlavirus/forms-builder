import { AuthGuard } from './auth.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthComponent } from '../../auth/auth.component';

describe('Auth Guard', () => {
  let guard: AuthGuard;
  let service: AuthService;
  let store: MockStore;
  const initialState = { isAuthenticated: null, userInfo: null };
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthGuard,
        provideMockStore({ initialState }),
        {provide: Router, useValue: router}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
  });

  // it('be able to hit route when user is logged in', () => {
  //   console.log(guard.canActivate());
  // });
});

