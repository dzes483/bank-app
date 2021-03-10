import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: any;
  blank: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll()
      .subscribe(
        (response: any) => {
          this.users$ = response.results;
          console.log(response.results);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  deleteUser(id: string): void {
    if (window.confirm('Are you sure you wish to delete this user?')) {
      this.userService.delete(id).subscribe(res => this.getUsers());
    }
  }
}
