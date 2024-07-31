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

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Atualiza userType com base no AuthService
    this.userType = this.authService.getLoginType();
    console.log('UserType on Init:', this.userType);
  }

  navigateTo(path: string) {
    const userType = this.authService.getLoginType();
    if (userType) {
      // Ajuste a lógica para usar apenas valores válidos de userType
      const route = userType === 'empresa'
        ? `/auth/empresa/${path}`
        : `/auth/candidato/${path}`;

      if (route) {
        this.router.navigate([route]);
      } else {
        console.error('Tipo de usuário não reconhecido');
        // Redirecionar ou mostrar mensagem de erro
      }
    } else {
      console.error('Tipo de usuário não definido');
      // Redirecionar ou mostrar mensagem de erro
    }
  }
}
