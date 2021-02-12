import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { SharedModule } from 'app/shared/shared.module';
import { FormPageComponent } from './form-page.component';
import { FormPageBuilderComponent } from './form-page-builder/form-page-builder.component';
import { FormPageFieldsComponent } from './form-page-fields/form-page-fields.component';
import { FormPageStylingComponent } from './form-page-styling/form-page-styling.component';
import { FormPageStylingItemComponent } from './form-page-styling/form-page-styling-item/form-page-styling-item.component';

const routes: Routes = [
  { path: '', component: FormPageComponent }
];

@NgModule({
  declarations: [
    FormPageComponent,
    FormPageBuilderComponent,
    FormPageFieldsComponent,
    FormPageStylingComponent,
    FormPageStylingItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    ReactiveFormsModule,
    DragDropModule,
    SharedModule,
    MatButtonModule,
    ReactiveComponentModule
  ],
  exports: [
    FormPageComponent,
    MatButtonModule
  ]
})

export class FormPageModule { }
