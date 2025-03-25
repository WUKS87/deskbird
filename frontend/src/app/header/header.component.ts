import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { selectUserRole } from '../store/profile/profile.selectors';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MenubarModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public store = inject(Store);

    public showHeader = this.store.select(selectUserRole).pipe(
        map(role => role ? true : false)
    );

    public items: MenuItem[] = [
        {
            label: 'Home',
            route: '/list',
        },
        {
            label: 'Sign Out',
            command: () => {
                localStorage.removeItem('deskbirdUserSession');
                window.location.href = '/auth';
            },
        },
    ];
}
