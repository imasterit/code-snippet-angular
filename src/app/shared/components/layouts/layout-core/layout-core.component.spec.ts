import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { By } from '@angular/platform-browser';
import { MaterialModule } from './../../../../material.module';

import { LayoutCoreComponent } from './layout-core.component';
import { DrawerComponent } from './../../drawer/drawer.component';

import { RoleGuardService } from 'src/app/shared/guards/role-guard.service';
import { MockRoleGuardService } from 'src/app/shared/guards/role-guard.service.mock';

describe('LayoutCoreComponent', () => {
    let component: LayoutCoreComponent;
    let fixture: ComponentFixture<LayoutCoreComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutCoreComponent, DrawerComponent],
            imports: [
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                MaterialModule
            ],
            providers: [
                {provide: RoleGuardService, useClass: MockRoleGuardService}
            ]
        });

        fixture = TestBed.createComponent(LayoutCoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Unit ---

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Integration ---

    // Drawer

    it('shoulder render <mat-drawer-container>', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-drawer-container')).toBeTruthy();
    });

    it('shoulder render #drawerContainer', () => {
        const compiled = fixture.debugElement.query(By.css('#drawerContainer'));
        expect(compiled).toBeTruthy();
    });

    it('shoulder render <mat-drawer>', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-drawer')).toBeTruthy();
    });

    it('shoulder render <mat-drawer-content>', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-drawer-content')).toBeTruthy();
    });

    it('shoulder render #drawerPage', () => {
        const compiled = fixture.debugElement.query(By.css('#drawerPage'));
        expect(compiled).toBeTruthy();
    });

    // Sidebar

    it('shoulder render <mat-sidenav-container>', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-sidenav-container')).toBeTruthy();
    });

    // xit('shoulder render mat-sidenav with id #navleft', () => {
    //     const compiled = fixture.debugElement.query(By.css('mat-sidenav#navleft'));
    //     expect(compiled).toBeTruthy();
    // });

    // xit('shoulder render mat-sidenav with id #navright', () => {
    //     const compiled = fixture.debugElement.query(By.css('mat-sidenav#navright'));
    //     expect(compiled).toBeTruthy();
    // });

    it('shoulder render mat-sidenav-content', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-sidenav-content')).toBeTruthy();
    });

});
