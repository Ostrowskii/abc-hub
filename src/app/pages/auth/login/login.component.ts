import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) {}
  markEmailAsTouched() {
    this.emailControl.markAsTouched();
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }

  createAccount() {
    this.router.navigate(['/create-account']);
  }
  entrar() {
    console.log(this.formGroup.value);
    this.auth
      .login({
        identifier: this.formGroup.value.email,
        password: this.formGroup.value.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/treinamento']);
        },
        error: (err) => {
          console.log(err);
          const errMessage: string = err?.error?.error?.message;
          if (errMessage.includes('Invalid identifier or password')) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro!',
              detail: 'Email ou senha não conferem.',
            });
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Erro!',
              detail: err?.error?.error?.message,
            });
          }
        },
      });
  }
}
