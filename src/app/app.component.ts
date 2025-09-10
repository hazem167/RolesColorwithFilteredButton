import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';  // ✅ correct import
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatChip, MatChipListbox, MatChipOption } from '@angular/material/chips';
import { NgClass, NgFor,NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[MatProgressSpinnerModule,MatChipOption,MatChipListbox,MatFormField,MatLabel,MatCard,MatChip,NgFor,NgIf,FormsModule,NgForOf,MatInput,NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchValue: string = '';

  constructor(private userService: UserService) {}
  loading = true;
  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
      this.loading = false;
    });
  }

  search() {
   let filtered = this.users;

  if (this.selectedRole !== 'All') {
    filtered = filtered.filter(
      user => user.role.toLowerCase() === this.selectedRole.toLowerCase()
    );
  }

  if (this.searchValue.trim() !== '') {
    filtered = filtered.filter(user =>
      user.email.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  this.filteredUsers = filtered;
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
roles: string[] = ['All', 'User', 'Moderator', 'Admin'];
selectedRole = 'All';

  filterByRole(role: string) {
  this.selectedRole = role;

  if (role === 'All') {
    this.filteredUsers = this.users; // show all
  } else {
    this.filteredUsers = this.users.filter(
      user => user.role.toLowerCase() === role.toLowerCase()
    );
  }
}
}
