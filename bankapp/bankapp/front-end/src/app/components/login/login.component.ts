import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): any {
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.access_token) {
          this.authService.storeInLocalStorage('token', response.access_token);
          this.router.navigate(['api/products']).then(r => console.log(r));
        }
      },
      (error: any) => {
        console.log(error);
      });
  }

}
