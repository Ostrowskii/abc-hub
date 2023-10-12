import { Component } from '@angular/core';
import { first } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ModuloService } from 'src/app/shared/services/modulo.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor(
    private moduloService: ModuloService,
    private searchService: SearchService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.moduloService
      .loadModulosAPI()
      .pipe(first())
      .subscribe({
        next: () => {
          this.searchService.loadContent();
          this.chatService.loadMessagesAPI().subscribe();
          this.chatService.startSocket();
        },
        error: () => {
          this.searchService.loadContent();
          this.chatService.loadMessagesAPI().subscribe();
          this.chatService.startSocket();
        },
      });
  }
}
