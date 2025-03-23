import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsersService } from '../service/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, TableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
    private usersService = inject(UsersService);
    private destroyRef = inject(DestroyRef);

    public users: any[] = [];
    public cols = [
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' }
    ];

    ngOnInit(): void {
        this.usersService.getAllUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((users) => {
            this.users = users;
        });
    }
}
