import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

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
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Signup failed', error);
      }
    );
  }
}
