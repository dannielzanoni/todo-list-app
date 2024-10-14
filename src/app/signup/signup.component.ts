import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']  // Corrigido para 'styleUrls'
})
export class SignupComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) { }

  onSignUp(): void {
    if (this.password !== this.confirmPassword) {
      console.error('As senhas não correspondem.');
      return;
    }

    const userData = {
      username: this.username,
      password: this.password
    };

    this.authService.signUp(userData).subscribe(
      (response: any) => {
        console.log('Signup successful!', response);
      },
      (error: any) => {
        console.error('Signup failed', error);
      }
    );
  }
}
