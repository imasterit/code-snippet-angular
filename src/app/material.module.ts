// Reference: https://stackoverflow.com/questions/45166844/how-to-import-angular-material-in-project
import { NgModule } from '@angular/core';
import { HAMMER_LOADER } from '@angular/platform-browser';

import {
    MatNativeDateModule,
    // Form Controls
    MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
    // Navigation
    MatMenuModule, MatSidenavModule, MatToolbarModule,
    // Layout
    MatCardModule, MatDividerModule, MatGridListModule, MatListModule, MatExpansionModule, MatStepperModule, MatTabsModule,
    // Buttons & Indicators
    MatButtonModule, MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatRippleModule,
    // Popups & Modals
    MatDialogModule, MatSnackBarModule, MatTooltipModule,
    MatDialogRef, MAT_DIALOG_DATA,
    // Data Table
    MatSortModule, MatPaginatorModule, MatTableModule
} from '@angular/material';

@NgModule({
    imports: [
        MatNativeDateModule,
        // Form Controls
        MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
        // Navigation
        MatMenuModule, MatSidenavModule, MatToolbarModule,
        // Layout
        MatCardModule, MatDividerModule, MatGridListModule, MatListModule, MatExpansionModule, MatStepperModule, MatTabsModule,
        // Buttons & Indicators
        MatButtonModule, MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatRippleModule,
        // Popups & Modals
        MatDialogModule, MatSnackBarModule, MatTooltipModule,
        // Data Table
        MatSortModule, MatPaginatorModule, MatTableModule
    ],
    exports: [
        MatNativeDateModule,
        // Form Controls
        MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
        // Navigation
        MatMenuModule, MatSidenavModule, MatToolbarModule,
        // Layout
        MatCardModule, MatDividerModule, MatGridListModule, MatListModule, MatExpansionModule, MatStepperModule, MatTabsModule,
        // Buttons & Indicators
        MatButtonModule, MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatRippleModule,
        // Popups & Modals
        MatDialogModule, MatSnackBarModule, MatTooltipModule,
        // Data Table
        MatSortModule, MatPaginatorModule, MatTableModule
    ],
    providers: [
        {
            provide: HAMMER_LOADER,
            useValue: () => new Promise(() => {})
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class MaterialModule { }
