import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service'; // Importe o serviço
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../layouts/footer/footer.component';
import { NavMenuComponent } from '../../../layouts/nav-menu/nav.menu.component';

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
    private router: Router,
    private storageService: StorageService // Injete o serviço
  ) {}

  ngOnInit(): void {
    this.authService.getLoginType().subscribe(userType => {
      this.userType = userType;

      if (this.userType === 'candidato' && this.router.url === '/auth/candidato/login') {
        this.router.navigate(['auth/candidato/login']);
      } else if (this.userType === 'empresa' && this.router.url === '/auth/empresa/login') {
        this.router.navigate(['auth/empresa/login']);
      }

      if (this.userType === 'candidato' && this.router.url === '/auth/candidato/registrar') {
        this.router.navigate(['auth/candidato/registrar']);
      } else if (this.userType === 'empresa' && this.router.url === '/auth/empresa/registrar') {
        this.router.navigate(['auth/empresa/registrar']);
      }
    });

    // Corrige o tipo para loginType
    const storedLoginType = this.storageService.getItem('loginType');
    if (storedLoginType === 'login' || storedLoginType === 'registrar') {
      this.loginType = storedLoginType;
    } else {
      this.loginType = 'login'; // Ou defina um valor padrão, se necessário
    }
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
    this.storageService.setItem('loginType', loginType); // Usando o serviço
    this.navigateTo(this.loginType);
  }
}
