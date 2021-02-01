import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  message: string;

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
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
          this.loginSuccess(res);
          this.authService.setData(res[0]);
        } else  {
          this.loginForm.reset();
          this.message = 'Пользователь с таким логином и паролем не обнаружен.';
        }
      },
      (({ error }) => console.log(error))
    );
  }

  private loginSuccess(data: any): void {
    this.loginForm.reset();
    this.router.navigate([`/user`]);
  }
}
