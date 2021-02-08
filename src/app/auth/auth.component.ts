import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  message: string;
  hide = true;

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Пожалуйста введите данные';
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
        (res) => {
        if (res[0]) {
          this.loginSuccess();
          this.authService.setData(res[0]);
        } else  {
          this.loginForm.reset();
          this.message = 'Пользователь с таким логином и паролем не обнаружен.';
        }
      },
      (({ error }) => console.log(error))
    );
  }

  private loginSuccess(): void {
    this.loginForm.reset();
    this.router.navigate([`/user`]);
  }
}
