import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  items: any[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' },
      { label: 'SignUp', icon: 'pi pi-user-plus', routerLink: '/signup' }
    ];
  }
}
