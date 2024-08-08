import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { NavMenuComponent } from "../../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../../layouts/footer/footer.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-login',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    NavMenuComponent,
    FooterComponent
  ],
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss']
})
export class CompanyLoginComponent implements OnInit {
loginWithSocial(arg0: string) {
throw new Error('Method not implemented.');
}

  companyForm!: FormGroup;
  loginUserType: 'login' | 'registrar' = 'login'; // Assegure-se de que o tipo está correto
  loginMethod: 'cnpj' | 'email' = 'email';
  showPassword = false;
  cnpjMask = '000.000.000-00';

  constructor(
    private toast: ToastrService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.companyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      rememberMe: [false],
      stayLogged: [false]
    });
  }

  toggleLoginMethod(method: 'cnpj' | 'email'): void {
    this.loginMethod = method;
  }

  toggleForm(type: 'login' | 'registrar'): void {
    if (type === 'registrar') {
      this.router.navigate(['/auth/empresa/registrar']); // Redireciona para a página de registro
    } else {
      this.router.navigate(['/auth/empresa/login']); // Redireciona para a página de login
    }
  }

  formatCNPJ(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    // Aplica a formatação: 00.000.000/0000-00
    input.value = value
      .replace(/^(\d{2})(\d)/, '$1.$2') // Adiciona o primeiro ponto
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona o segundo ponto
      .replace(/\.(\d{3})(\d{4})(\d)/, '.$1/$2-$3'); // Adiciona a barra e o hífen
    input.value = value
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const { email, cnpj, senha, rememberMe, stayLogged } = this.companyForm.value;
      const loginData = this.loginMethod === 'email' ? { email, senha, rememberMe, stayLogged } : { cnpj, senha, rememberMe, stayLogged };

      if (this.loginUserType === 'login') {
        // Lógica para login
        this.authService.loginCompany(email, cnpj, senha).subscribe({
          next: () => this.router.navigate(['#']), // Redireciona para a página de sucesso ou dashboard
          error: (err) => {
            console.error('Erro durante o login', err);
            this.toast.error('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
          }
        });
      } else if (this.loginUserType === 'registrar') {
        // Lógica para registro
        this.authService.registerCompany('', cnpj, email, '', senha, '').subscribe({
          next: () => this.router.navigate(['#']), // Redireciona para a página de login após registro
          error: (err) => {
            console.error('Erro durante o registro', err);
            this.toast.error('Falha ao registrar. Verifique suas informações e tente novamente.');
          }
        });
      }
    } else {
      this.toast.error('Por favor, preencha o formulário corretamente.');
    }
  }
}
