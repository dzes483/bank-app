import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSuccessful = false;
  isRegisterFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: [null, [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]+'),
        Validators.minLength(3),
        Validators.maxLength(20)]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.value)
      .subscribe((response: any) => {
        console.log(response);
        this.isSuccessful = true;
        this.isRegisterFailed = false;
        window.location.reload();
      }, err => {
        this.errorMessage = err.error.message;
        this.isRegisterFailed = true;
      });
  }

  // Getters
  get username(): any {
    return this.registerForm.get('username');
  }
  get password(): any {
    return this.registerForm.get('password');
  }

  showPassword(): any {
    const x = document.getElementById('password') as HTMLInputElement;
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
}
