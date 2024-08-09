import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
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
    RouterModule,
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

  constructor(
    private toast: ToastrService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.candidateForm = this.fb.group({
      nome: [''],
      cpf: [''],
      email: [''],
      emailConfirm: [''],
      senha: [''],
      senhaConfirm: [''],
      rememberMe: [false],
      stayLogged: [false]
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.candidateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
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
    if (type === 'login') {
      this.router.navigate(['/auth/candidato/login']); // Redireciona para a página de registro
    } else {
      this.router.navigate(['/auth/candidato/registrar']); // Redireciona para a página de login
    }
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
        this.authService.loginCandidate(loginData.email, loginData.cpf, loginData.senha).subscribe({
          next: () => {
            console.log('Login bem-sucedido');
            this.router.navigate(['/candidato/perfil']); // Ajuste a rota conforme necessário
          },
          error: (err) => {
            console.error('Erro durante o login', err);
            this.toast.error('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
          }
        });
      } else if (this.loginUserType === 'registrar') {
        // Lógica para registro
        this.authService.registerCandidate(nome, cpf, email, emailConfirm, senha, senhaConfirm).subscribe({
          next: () => {
            console.log('Registro bem-sucedido');
            this.router.navigate(['/candidato/perfil']); // Ajuste a rota conforme necessário
          },
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
