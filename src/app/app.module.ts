import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot(),
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
