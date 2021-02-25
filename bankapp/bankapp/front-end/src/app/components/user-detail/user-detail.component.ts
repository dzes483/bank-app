import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userEditForm: FormGroup;
  isSubmitted = false;
  isUpdateFailed = false;
  id!: string;
  errorMessage = '';


  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.userEditForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.isSubmitted = false;
    this.isUpdateFailed = false;
    this.getUser(this.route.snapshot.paramMap.get('id') || '');
  }

  getUser(id: string): any {
    this.userService.get(id).subscribe(
      response => {
        console.log(response);
        console.log(id);
        this.userEditForm.setValue({
          username: response.username,
          password: response.password,
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUser(): any {
    this.userService.update(this.route.snapshot.paramMap.get('id') || '', this.userEditForm.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          console.log(this.id);
          this.isSubmitted = true;
        },
        (error: any) => {
          this.errorMessage = error.error.message;
          console.log(this.id);
          this.isUpdateFailed = true;
          console.log(error);
        }
      );
  }

  // Getters
  get name(): any {
    return this.productEditForm.get('name');
  }
  get age(): any {
    return this.productEditForm.get('age');
  }
  get income(): any {
    return this.productEditForm.get('income');
  }
  get student(): any {
    return this.productEditForm.get('student');
  }
}
