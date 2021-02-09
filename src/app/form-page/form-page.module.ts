import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './form-page.component';
import { FormPageBuilderComponent } from './form-page-builder/form-page-builder.component';
import { FormPageFieldsComponent } from './form-page-fields/form-page-fields.component';
import { FormPageStylingComponent } from './form-page-styling/form-page-styling.component';
import { FormPageStylingItemComponent } from './form-page-styling/form-page-styling-item/form-page-styling-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { ReactiveComponentModule } from '@ngrx/component';

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
    ReactiveComponentModule
  ],
  exports: [
    FormPageComponent
  ]
})

export class FormPageModule { }
