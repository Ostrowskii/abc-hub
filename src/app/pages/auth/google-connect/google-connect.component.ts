import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-google-connect',
  templateUrl: './google-connect.component.html',
  styleUrls: ['./google-connect.component.scss'],
})
export class GoogleConnectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    const access_token = this.route.snapshot.queryParams['access_token'];
    this.auth.loginWithGoogle(access_token).subscribe({
      next: (res) => {
        console.log('res');
        console.log(res);
        localStorage.setItem('token_jwt', res.jwt);
        this.router.navigate(['/treinamento']);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/login']);
      },
    });
  }
}
