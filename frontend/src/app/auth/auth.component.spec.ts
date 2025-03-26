import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { setProfile } from '../store/profile/profile.actions';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    storeSpy.select.and.returnValue(of(null));
    
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [{ provide: Store, useValue: storeSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setProfile action on valid form submission', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'pass' });
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    tick();
    fixture.detectChanges();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      setProfile({ credentials: { email: 'test@example.com', password: 'pass' } })
    );
  }));
});
