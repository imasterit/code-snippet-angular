import { ComponentFixture, TestBed} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { By } from '@angular/platform-browser';
import { MaterialModule } from './../../../material.module';

import { DrawerComponent } from './drawer.component';
// import { AuthService } from './../../services/auth.service';
// import { AccountService } from './../../services/account.service';
// import { ThemeService } from './../../services/theme.service';

// Roles & Privs
import { RoleGuardService } from './../../guards/role-guard.service';
import { MockRoleGuardService } from './../../../shared/guards/role-guard.service.mock';

describe('DrawerComponent', () => {
    let component: DrawerComponent;
    let fixture: ComponentFixture<DrawerComponent>;
    // let authService: AuthService;
    // let accountService: AccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DrawerComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                MaterialModule
            ],
            providers: [
                {provide: RoleGuardService, useClass: MockRoleGuardService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(DrawerComponent);
        component = fixture.componentInstance;

        // Services
        // authService = TestBed.get(AuthService);
        // accountService = TestBed.get(AccountService);

        fixture.detectChanges();
    });

    // Unit ---

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain property logo of type string', () => {
        expect(typeof component.logo).toBe('string');
    });

    it('should ensure triggerLogout() was ran', () => {
        const spy = spyOn(component, 'triggerLogout').and.returnValue(null);
        component.triggerLogout();
        expect(spy).toHaveBeenCalled();
    });

    // Integration ---

    it('should render div with id of #drawer and class of .bgPrimary', () => {
        const compiled = fixture.debugElement.query(By.css('div#drawer.bgPrimary'));
        expect(compiled).toBeTruthy();
    });

});
