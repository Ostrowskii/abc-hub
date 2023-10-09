import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import { BottonNavBarComponent } from './botton-nav-bar/botton-nav-bar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { GreenButtonComponent } from './green-button/green-button.component';
import { MenssageComponent } from './menssage/menssage.component';
import { SearchMessageComponent } from './search-message/search-message.component';

//provider
import { MessageService } from 'primeng/api';

//reactive forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//primeng
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { GoogleButtonComponent } from './google-button/google-button.component';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { SearchMessageAiComponent } from './search-message-ai/search-message-ai.component';

@NgModule({
  declarations: [
    BottonNavBarComponent,
    TopNavBarComponent,
    GreenButtonComponent,
    MenssageComponent,
    SearchMessageComponent,
    GoogleButtonComponent,
    SearchMessageAiComponent,
  ],
  imports: [
    CommonModule,
    TabViewModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToolbarModule,
    TreeModule,
    CardModule,
    OverlayPanelModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
    DividerModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
  exports: [
    BottonNavBarComponent,
    TopNavBarComponent,
    GreenButtonComponent,
    MenssageComponent,
    SearchMessageAiComponent,
    SearchMessageComponent,
    TabViewModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToolbarModule,
    TreeModule,
    CardModule,
    OverlayPanelModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
    DividerModule,
    DropdownModule,
    CalendarModule,

    FormsModule,
    ReactiveFormsModule,
    GoogleButtonComponent,
    PasswordModule,
    HttpClientModule,
  ],
  providers: [MessageService],
})
export class SharedModule {}
