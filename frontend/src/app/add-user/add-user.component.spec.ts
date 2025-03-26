import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { addUser, addUserSuccess, editUser, editUserSuccess } from '../store/users/users.actions';
import { User } from '../models/users.model';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let actionsSubject: Subject<any>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    storeSpy.select.and.returnValue(of(null));
    actionsSubject = new Subject<any>();

    await TestBed.configureTestingModule({
      imports: [AddUserComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Actions, useValue: actionsSubject }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should not dispatch any action if form is invalid', () => {
      component.addUserForm.reset();
      component.onSubmit();

      expect(storeSpy.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch addUser action when form is valid and not in edit mode', () => {
      component.isEditMode.set(false);
      component.addUserForm.setValue({ email: 'test@example.com', role: 'user' });
      component.onSubmit();

      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        addUser({ user: { email: 'test@example.com', role: 'user' } })
      );
    });

    it('should dispatch editUser action when form is valid and in edit mode', () => {
      const existingUser: User = { id: 1, email: 'old@example.com', role: 'user' };
      component.openForEdit(existingUser);
      
      component.addUserForm.setValue({ email: 'new@example.com', role: 'admin' });
      component.onSubmit();
      
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        editUser({ user: { ...existingUser, email: 'new@example.com', role: 'admin' } })
      );
    });
  });

  describe('Dialog and Form Behavior', () => {
    it('should open dialog when showDialog is called', () => {
      component.showDialog();

      expect(component.visible()).toBe(true);
    });

    it('should set edit mode and patch form values on openForEdit', () => {
      const user: User = { id: 2, email: 'user@example.com', role: 'user' };
      component.openForEdit(user);

      expect(component.isEditMode()).toBe(true);
      expect(component.addUserForm.value).toEqual({
        email: user.email,
        role: user.role
      });
      expect(component.visible()).toBe(true);
    });

    it('should hide dialog and reset form when hideDialog is called', () => {
      component.addUserForm.setValue({ email: 'test@example.com', role: 'admin' });
      component.isEditMode.set(true);
      
      (component as any)['user'] = { id: 3, email: 'test@example.com', role: 'admin' };
      component.hideDialog();

      expect(component.visible()).toBe(false);
      expect(component.isEditMode()).toBe(false);
      expect(component.addUserForm.value).toEqual({ email: null, role: null });
      expect((component as any)['user']).toBeNull();
    });

    it('should close dialog and reset form on addUserSuccess action', fakeAsync(() => {
      component.addUserForm.setValue({ email: 'test@example.com', role: 'user' });
      component.showDialog();
      
      actionsSubject.next(addUserSuccess({ user: { id: 3, email: 'test@example.com', role: 'user' }}));
      
      tick();
      fixture.detectChanges();

      expect(component.visible()).toBe(false);
      expect(component.addUserForm.value).toEqual({ email: null, role: null });
    }));

    it('should close dialog and reset form on editUserSuccess action', fakeAsync(() => {
      component.addUserForm.setValue({ email: 'test@example.com', role: 'user' });
      component.showDialog();
      
      actionsSubject.next(editUserSuccess({ user: { id: 3, email: 'test@example.com', role: 'user' } }));
      
      tick();
      fixture.detectChanges();

      expect(component.visible()).toBe(false);
      expect(component.addUserForm.value).toEqual({ email: null, role: null });
    }));
  });
});
