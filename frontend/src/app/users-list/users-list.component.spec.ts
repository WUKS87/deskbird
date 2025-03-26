import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { User } from '../models/users.model';
import { deleteUser, getUsers } from '../store/users/users.actions';
import { AddUserComponent } from '../add-user/add-user.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let actionsSubject: Subject<any>;

  beforeEach(async () => {
    localStorage.setItem('deskbirdUserSession', JSON.stringify({ role: 'admin' }));

    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    storeSpy.select.and.returnValue(of(null));
    actionsSubject = new Subject<any>();
    
    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Actions, useValue: actionsSubject }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAdmin to true when the stored user role is admin', () => {
    expect(component.isAdmin()).toBe(true);
  });

  it('should dispatch getUsers action on initialization', () => {
    expect(storeSpy.dispatch).toHaveBeenCalledWith(getUsers());
  });

  it('should call openForEdit on userModal when editUser is called', () => {
    const addUserStub: Partial<AddUserComponent> = {
      openForEdit: jasmine.createSpy('openForEdit')
    };
    component.userModal = addUserStub as AddUserComponent;

    const user: User = { id: 2, email: 'edit@test.com', role: 'user' };
    component.editUser(user);

    expect(addUserStub.openForEdit).toHaveBeenCalledWith(user);
  });

  it('should dispatch deleteUser action when deleteUser is called', () => {
    const user: User = { id: 3, email: 'delete@test.com', role: 'user' };
    component.deleteUser(user);

    expect(storeSpy.dispatch).toHaveBeenCalledWith(deleteUser({ id: 3 }));
  });
});
