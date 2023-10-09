import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { GoogleConnectComponent } from './google-connect/google-connect.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';

@NgModule({
  declarations: [LoginComponent, GoogleConnectComponent, CreateAccountComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [LoginComponent, GoogleConnectComponent],
})
export class AuthModule {}
