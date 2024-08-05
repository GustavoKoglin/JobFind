import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { Language } from '../../../interface/laguange.interface';
import { NavMenuComponent } from "../../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../../layouts/footer/footer.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    NavMenuComponent,
    FooterComponent,
  ],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyForm!: FormGroup;
  loginType: 'login' | 'registrar' = 'login';
  userType = 'empresa';
  showPassword = false;
  showConfirmPassword = false;

  currentLanguage: Language = { code: 'pt-br', name: 'Português' };
  languages: Language[] = [
    { code: 'pt-br', name: 'Português' },
    { code: 'en', name: 'Inglês' },
    { code: 'es', name: 'Espanhol' },
    { code: 'fr', name: 'Francês' }
  ];

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userType = 'empresa';
    console.log('UserType on Constructor:', this.userType);
    this.loginType = 'login';
    console.log('LoginType on Constructor:', this.loginType);
  }

  ngOnInit(): void {
    this.initializeForm();

    // Verifica se está no lado do navegador antes de carregar o idioma e o estado do formulário
    if (isPlatformBrowser(this.platformId)) {
      this.loadLanguage();
      this.loadFormState();
    }
  }

  // Carrega o idioma salvo no localStorage, se existir
  loadLanguage(): void {
    if (typeof window !== 'undefined') {
      const savedLanguageCode = localStorage.getItem('language');
      if (savedLanguageCode) {
        this.currentLanguage = this.languages.find(lang => lang.code === savedLanguageCode) || { code: 'pt-br', name: 'Português' };
        this.translate.use(this.currentLanguage.code);
      }
    }
  }

  initializeForm(): void {
    this.companyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: [''],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmSenha: [''],
      rememberMe: [false],
      stayLogged: [false]
    }, { validators: this.passwordMatchValidator });
  }

  // Alterna entre os formulários de login e registro
  toggleForm(type: 'login' | 'registrar'): void {
    this.loginType = type;
    if (type === 'login') {
      this.companyForm.get('confirmEmail')?.clearValidators();
      this.companyForm.get('confirmSenha')?.clearValidators();
    } else {
      this.companyForm.get('confirmEmail')?.setValidators([Validators.required, Validators.email]);
      this.companyForm.get('confirmSenha')?.setValidators([Validators.required, Validators.minLength(8)]);
    }
    this.companyForm.get('confirmEmail')?.updateValueAndValidity();
    this.companyForm.get('confirmSenha')?.updateValueAndValidity();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Envia o formulário, realizando login ou registro
  onSubmit(): void {
    if (this.companyForm.valid) {
      const { email, senha } = this.companyForm.value;

      if (this.loginType === 'login') {
        this.authService.loginCompany(email, senha).subscribe({
          next: () => this.router.navigate(['/home']),
          error: (error: any) => console.error('Erro ao fazer login', error)
        });
      } else {
        if (this.companyForm.hasError('passwordMismatch') || this.companyForm.hasError('emailMismatch')) {
          return;
        }

        // Código para registrar o usuário aqui
        const { nome, cpf, email, emailConfirm, senha, senhaConfirm } = this.companyForm.value;
        this.authService.registerCompany(nome, cpf, email, emailConfirm, senha, senhaConfirm).subscribe({
          next: () => this.router.navigate(['/auth/empresa/registrar']), // Atualize para a rota de sucesso ou onde quiser redirecionar
          error: (error: any) => console.error('Erro ao registrar', error)
        });
      }
    } else {
      this.companyForm.markAllAsTouched();
    }
  }
  navigateTo(userType: 'empresa', loginType: 'login' | 'registrar'): void {
    if (this.userType && this.loginType === 'login') {
      const route = `/auth/${this.userType}/${loginType}`;
      this.router.navigate([route]);
    } else {
      console.error('Falha ao logar!');
    }
    if (this.userType && this.loginType === 'registrar') {
      const route = `/auth/${this.userType}/${loginType}`;
      this.router.navigate([route]);
    } else {
      console.error('Falha ao registrar!');
    }
  }

  setLoginType(loginType: 'login' | 'registrar'): void {
    this.loginType = loginType;
    console.log('LoginType:', this.loginType);
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const senha = formGroup.get('senha')?.value;
    const confirmSenha = formGroup.get('confirmSenha')?.value;

    if (senha && confirmSenha && senha !== confirmSenha) {
      formGroup.get('confirmSenha')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmSenha')?.setErrors(null);
    }

    const email = formGroup.get('email')?.value;
    const confirmEmail = formGroup.get('confirmEmail')?.value;

    if (email && confirmEmail && email !== confirmEmail) {
      formGroup.get('confirmEmail')?.setErrors({ emailMismatch: true });
    } else {
      formGroup.get('confirmEmail')?.setErrors(null);
    }

    return null;
  }

   // Define o idioma atual e salva no localStorage
   setLanguage(language: Language): void {
    if (typeof window !== 'undefined') {
      this.currentLanguage = language;
      localStorage.setItem('language', JSON.stringify(language));
      this.translate.use(language.code);
    }
  }

  // Carrega o estado do formulário salvo no localStorage
  loadFormState(): void {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem('loginType');
      this.loginType = savedType === 'registrar' ? 'registrar' : 'login';
      this.initializeForm(); // Certifique-se de inicializar o formulário corretamente com base no tipo
    }
  }

  loadFormData(): void {
    const storedFormData = localStorage.getItem('companyFormData');
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      this.companyForm.patchValue(formData);
    }
  }

  // Salva o estado do formulário no localStorage
  saveFormState(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('formState', JSON.stringify(this.companyForm.value));
    }
  }

  saveFormData(): void {
    if (this.companyForm.valid) {
      const formData = this.companyForm.getRawValue();
      localStorage.setItem('companyFormData', JSON.stringify(formData));
    }
  }

}
