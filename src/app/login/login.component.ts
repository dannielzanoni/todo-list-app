import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (this.authService.isAuthenticated()) {
          const loggedInUsername = localStorage.getItem('username');
          console.log('Usuário logado:', loggedInUsername);

          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.toastService.showError("Erro ao realizar o Login, verifique Usuário e Senha!");
        console.error('Erro ao fazer login:', err);
      }
    });
  }

}
