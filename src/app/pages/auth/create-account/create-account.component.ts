import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Register from 'src/app/shared/_interfaces/register.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private auth: AuthService
  ) {}
  markEmailAsTouched() {
    this.emailControl.markAsTouched();
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      nome: new FormControl(''),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
  criarConta() {
    const data = this.formGroup.value;
    if (data.password !== data.passwordConfirm) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: 'Senha e confirmação de senha não conferem. Tente novamente.',
      });
      return;
    }
    if (data.password.length < 6) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: 'Senha deve ter pelo menos 6 caracteres.',
      });
      return;
    }
    if (!data.email.includes('@')) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: 'Precisa inserir um email válido.',
      });
      return;
    }
    if (!data.nome) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: 'Campo nome é obrigatório.',
      });
      return;
    }

    const uuid = this.generateShortUUID();
    const username = data.email.split('@')[0] + '#' + uuid;
    this.register({
      email: data.email,
      password: data.password,
      nome: data.nome,
      username,
    });

    //this.router.navigate(['/home']);
  }

  register(data: Register) {
    this.auth.register(data).subscribe({
      next: () => {
        this.router.navigate(['/treinamento']);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'warn',
          summary: 'Erro!',
          detail: err?.error?.error?.message,
        });
      },
    });
  }

  generateShortUUID() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUUID = '';

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUUID += characters.charAt(randomIndex);
    }

    return shortUUID;
  }
}
