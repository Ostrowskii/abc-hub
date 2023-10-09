import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { CourseContentComponent } from './pages/main-layout/course-content/course-content.component';
import { TreinamentoComponent } from './pages/main-layout/treinamento/treinamento.component';
import { SearchComponent } from './pages/main-layout/search/search.component';
import { ChatAiComponent } from './pages/main-layout/chat-ai/chat-ai.component';
import { ChatSocialComponent } from './pages/main-layout/chat-social/chat-social.component';
import { PerfilComponent } from './pages/main-layout/perfil/perfil.component';
import { GoogleConnectComponent } from './pages/auth/google-connect/google-connect.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateAccountComponent } from './pages/auth/create-account/create-account.component';
import { authGuard } from './shared/__guards/auth.guard';
import { SocialCommentsComponent } from './pages/main-layout/social-comments/social-comments.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'treinamento',
        pathMatch: 'full',
      },
      {
        path: 'treinamento',
        component: TreinamentoComponent,
      },
      {
        path: 'course',
        component: CourseContentComponent,
      },
      {
        path: 'pesquisa',
        component: SearchComponent,
      },
      {
        path: 'ia',
        component: ChatAiComponent,
      },
      {
        path: 'social',
        component: ChatSocialComponent,
      },
      {
        path: 'perfil',
        component: PerfilComponent,
      },
      {
        path: 'social-comments',
        component: SocialCommentsComponent,
      },
    ],
    canActivate: [authGuard],
    canActivateChild: [authGuard],
  },
  {
    path: 'connect/google',
    component: GoogleConnectComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
