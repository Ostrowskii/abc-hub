import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TreinamentoComponent } from './treinamento/treinamento.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { ChatSocialComponent } from './chat-social/chat-social.component';
import { ChatAiComponent } from './chat-ai/chat-ai.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { SocialCommentsComponent } from './social-comments/social-comments.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    TreinamentoComponent,
    PerfilComponent,
    CourseContentComponent,
    ChatSocialComponent,
    ChatAiComponent,
    SearchComponent,
    SocialCommentsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
