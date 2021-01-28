import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './shared/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot(),
        ReactiveFormsModule
    ],
  exports: [
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
