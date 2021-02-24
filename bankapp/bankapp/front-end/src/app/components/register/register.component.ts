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
      username: [null, Validators.required],
      password: [null, Validators.required]
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
}
