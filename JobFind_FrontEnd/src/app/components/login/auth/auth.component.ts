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
  }
}
