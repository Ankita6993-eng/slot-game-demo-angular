import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { fakeBackendProvider } from '../app/helpers/fake-backend';
import { JwtInterceptor } from '../app/helpers/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './gurds/auth.guard'
import { AuthenticationService} from './service/authentication.service';
import { UserService} from './service/user.service';
import { SlotGameHomeComponent } from './slot-game-home/slot-game-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SlotGameHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
     fakeBackendProvider,
     AuthGuard,
     AuthenticationService,
     UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
