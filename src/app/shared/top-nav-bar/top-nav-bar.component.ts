import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
})
export class TopNavBarComponent {
  constructor(private router: Router, private auth: AuthService) {}
  sidebarVisible: boolean = false;
  ngOnInit(): void {
    this.auth.getUserInfo().subscribe();
  }
  perfilPage() {
    this.router.navigate(['/perfil']);
  }
  logout() {
    this.auth.logout();
  }
}
