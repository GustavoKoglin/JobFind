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
  selector: 'app-candidate-login',
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
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.scss']
})
export class CandidateLoginComponent implements OnInit {
loginWithSocial(arg0: string) {
throw new Error('Method not implemented.');
}

  candidateForm!: FormGroup;
  loginUserType: 'login' | 'registrar' = 'login'; // Assegure-se de que o tipo está correto
  loginMethod: 'cpf' | 'email' = 'email';
  showPassword = false;
  cpfMask = '000.000.000-00';

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
    this.candidateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      rememberMe: [false],
      stayLogged: [false]
    });
  }

  getLoginType(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('loginType');
    }
    return null;
  }

  toggleLoginMethod(method: 'cpf' | 'email'): void {
    this.loginMethod = method;
  }

  toggleForm(type: 'login' | 'registrar'): void {
    if (type === 'registrar') {
      this.router.navigate(['/auth/candidato/registrar']); // Redireciona para a página de registro
    } else {
      this.router.navigate(['/auth/candidato/login']); // Redireciona para a página de login
    }
  }

  formatCPF(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Aplica a formatação: 000.000.000-00
    value = value
      .replace(/^(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
      .replace(/\.(\d{3})(\d)/, '.$1.$2') // Adiciona o segundo ponto
      .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2'); // Adiciona o hífen

    input.value = value;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const { nome, cpf, email, emailConfirm, senha, senhaConfirm, rememberMe, stayLogged } = this.candidateForm.value;
      const loginData = this.loginMethod === 'email' ? { email, senha, rememberMe, stayLogged } : { cpf, senha, rememberMe, stayLogged };

      if (this.loginUserType === 'login') {
        // Lógica para login
        this.authService.loginCandidate(email, cpf, senha).subscribe({
          next: () => this.router.navigate(['#']), // Redireciona para a página de sucesso ou dashboard
          error: (err) => {
            console.error('Erro durante o login', err);
            this.toast.error('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
          }
        });
      } else if (this.loginUserType === 'registrar') {
        // Lógica para registro
        this.authService.registerCandidate(nome, cpf, email, emailConfirm, senha, senhaConfirm).subscribe({
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
