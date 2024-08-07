import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../layouts/footer/footer.component";
import { NavMenuComponent } from "../../../layouts/nav-menu/nav.menu.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    FooterComponent,
    NavMenuComponent
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userType?: 'empresa' | 'candidato';
  loginType?: 'login' | 'registrar';

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    console.log('UserType on Constructor:', this.userType);
    console.log('LoginType on Constructor:', this.loginType);
  }

  ngOnInit(): void {
    this.authService.getLoginType().subscribe(userType => {
      this.userType = userType;
      console.log('UserType on Init:', this.userType);

      //redirecionar para a página de login de candidato ou empresa
      if (this.userType === 'candidato' && this.router.url === '/auth/candidato/login') {
        this.router.navigate(['auth/candidato/login']);
      } else if (this.userType === 'empresa' && this.router.url === '/auth/empresa/login') {
        this.router.navigate(['auth/empresa/login']);
      }

      //redirecionar para a página de registro de candidato ou empresa
      if (this.userType === 'candidato' && this.router.url === '/auth/candidato/registro') {
        this.router.navigate(['auth/candidato/registrar']);
      } else if (this.userType === 'empresa' && this.router.url === '/auth/empresa/registro') {
        this.router.navigate(['/empresa/registrar']);
      }
    });
  }

  navigateTo(path: 'login' | 'registrar'): void {
    if (this.userType) {
      const route = `/auth/${this.userType}/${path}`;
      this.router.navigate([route]);
    } else {
      console.error('Tipo de usuário não definido');
    }
  }

  setLoginType(loginType: 'login' | 'registrar'): void {
    this.loginType = loginType;
    console.log('LoginType:', this.loginType);
    this.navigateTo(this.loginType); // Verifique se a navegação está funcionando conforme o esperado
  }
}
