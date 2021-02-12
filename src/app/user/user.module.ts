import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FormPageComponent } from '../form-page/form-page.component';
import { UserComponent } from './user.component';
import { FormPageModule } from '../form-page/form-page.module';

const routes: Routes = [
  { path: '', component: FormPageComponent }
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormPageModule,
  ]
})

export class UserModule { }
