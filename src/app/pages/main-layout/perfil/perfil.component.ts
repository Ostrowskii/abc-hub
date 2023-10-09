import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
interface Sexo {
  name: string;
  code: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  //img começa pelafoto de perfil
  uploadedImageData: any = '../../../../assets/img/vanessa.jpg'; // Declara a variável aqui para que seja acessível em todo o componente
  perfilForm: FormGroup;

  constructor(private messageService: MessageService, private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      username: ['', Validators.required], // Exemplo de campo obrigatório
      // email: ['vanessa@nautilusti.com', Validators.email],
      sexo: ['', Validators.required], // Exemplo de campo obrigatório
      dataNascimento: ['', Validators.required], // Exemplo de campo obrigatório
    });
  }
  sexos: Sexo[] | undefined;
  selectedSexo: Sexo | undefined;

  onBasicUploadAuto(event: UploadEvent | FileUploadEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'foto de perfil atualizada com sucesso',
    });

    const uploadedFile = event.files[0];
    this.uploadedImageData = URL.createObjectURL(uploadedFile); // Atribui a imagem à propriedade do componente
  }
  ngOnInit() {
    this.sexos = [
      { name: 'Feminino', code: 'F' },
      { name: 'Masculino', code: 'M' },
    ];
  }
  user = {
    name: 'Vanessa Ostroski',
    email: 'vanessa@nautilusti.com',
    sexValue: {
      name: 'Masculino',
      code: 'M',
    },
    birthDate: '01/06/23',
  };
}
