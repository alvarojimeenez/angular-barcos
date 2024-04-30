import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router) {}

  isLogin(): boolean {
    return this.router.url === "/"
  }

  isRegisterSocio(): boolean {
    return this.router.url === "/addSocio"
  }
}
