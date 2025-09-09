import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';  // ✅ correct import
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { NgClass, NgFor,NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone:true,
  imports:[MatFormField,MatLabel,MatCard,MatChip,NgFor,NgIf,FormsModule,NgForOf,MatInput,NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchValue: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      console.log('Loaded users:', data);
      this.users = data;
      this.filteredUsers = data;
    });
  }

  search() {
    this.filteredUsers = this.users.filter(user =>
      user.email.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  getRoleColor(role: string): 'primary' | 'accent' | 'warn' {
    switch (role) {
      case 'admin':
        return 'warn';
      case 'moderator':
        return 'primary';
      case 'user':
        return 'primary';
      default:
        return 'primary';
    }
  }
}
