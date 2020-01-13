import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EmailSharedModule } from 'projects/email/src/app/app.module';
import { UserAuthenticationService } from './user-authentication/user-authentication.service';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    UserAuthenticationModule,
    EmailSharedModule.forRoot(),
    AppRoutingModule
  ],
  providers: [UserAuthenticationService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
