import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EMessages } from 'app/shared/enums';
import { getAuthenticated, State } from 'app/core';
import { SetOnLoginAction } from 'app/core/core.actions';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public ngUnsubscribe$ = new Subject<void>();
  public authenticated$: Observable<boolean>;
  public message: string;
  public hide = true;

  public loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = EMessages.fillCredentials;
      }
    });

    this.authenticated$ = this.store.select(getAuthenticated).pipe(takeUntil(this.ngUnsubscribe$));
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(new SetOnLoginAction(this.loginForm.value));
    this.authenticated$.subscribe(res => {
      res ? this.loginSuccess() : this.showAlert();
    });
  }

  private loginSuccess(): void {
    this.loginForm.reset();
    this.router.navigate([`/user`]);
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  private showAlert(): void  {
    this.message = EMessages.wrongCredentials;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
