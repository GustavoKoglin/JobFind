import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { Language } from '../../../interface/laguange.interface';
import { NavMenuComponent } from "../../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../../layouts/footer/footer.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
  cpfMask = '***.***.***-**';



  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loginUserType = 'login';
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



  toggleLoginMethod(method: 'cpf' | 'email'): void {
    this.loginMethod = method;
  }

  toggleForm(type: 'login' | 'registrar'): void {
    this.loginUserType = type === 'registrar' ? 'registrar' : 'login';
    this.candidateForm.reset();
  }

  formatCPF(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    input.value = value.replace(/(\d{3})(\d{3})/, '$1.$2').replace(/(\d{3})(\d{2})$/, '$1-$2');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const { email, cpf, senha, rememberMe, stayLogged } = this.candidateForm.value;
      const loginData = this.loginMethod === 'email' ? { email, senha, rememberMe, stayLogged } : { cpf, senha, rememberMe, stayLogged };

      if (this.loginUserType === 'login') {
        // Lógica para login com sucesso
      } else {
        // Lógica para registro com sucesso
      }
    }
  }
}
