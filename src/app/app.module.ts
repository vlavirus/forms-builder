import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormPageComponent } from './form-page/form-page.component';
import { FormPageStylingComponent } from './form-page/form-page-styling/form-page-styling.component';
import { FormPageBuilderComponent } from './form-page/form-page-builder/form-page-builder.component';
import { FormPageFieldsComponent } from './form-page/form-page-fields/form-page-fields.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputComponent } from './shared/components/input/input.component';
import { TextareaComponent } from './shared/components/textarea/textarea.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { CheckboxComponent } from './shared/components/checkbox/checkbox.component';
import { SelectComponent } from './shared/components/select/select.component';
import { FieldsModule } from './core/fields/fields.module';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormPageStylingItemComponent } from './form-page/form-page-styling/form-page-styling-item/form-page-styling-item.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
    FormPageComponent,
    FormPageStylingComponent,
    FormPageBuilderComponent,
    FormPageFieldsComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    CheckboxComponent,
    SelectComponent,
    FormPageStylingItemComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    FieldsModule,
    ReactiveComponentModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } } , AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
