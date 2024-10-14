import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
      }
    });
  }

}
