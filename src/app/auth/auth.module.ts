import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveComponentModule } from '@ngrx/component';
import { AuthComponent } from './auth.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  exports: [
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ]
})
export class AuthModule { }
