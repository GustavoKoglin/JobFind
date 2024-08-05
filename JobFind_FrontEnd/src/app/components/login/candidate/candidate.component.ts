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
  selector: 'app-candidate',
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
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})

export class CandidateComponent implements OnInit {

  candidateForm!: FormGroup;
  loginType: 'login' | 'registrar' = 'login';
  userType = 'candidato';
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
    this.userType = 'candidato';
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
    this.candidateForm = this.fb.group({
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
      this.candidateForm.get('confirmEmail')?.clearValidators();
      this.candidateForm.get('confirmSenha')?.clearValidators();
    } else {
      this.candidateForm.get('confirmEmail')?.setValidators([Validators.required, Validators.email]);
      this.candidateForm.get('confirmSenha')?.setValidators([Validators.required, Validators.minLength(8)]);
    }
    this.candidateForm.get('confirmEmail')?.updateValueAndValidity();
    this.candidateForm.get('confirmSenha')?.updateValueAndValidity();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Envia o formulário, realizando login ou registro
  onSubmit(): void {
    if (this.candidateForm.valid) {
      const { email, senha } = this.candidateForm.value;

      if (this.loginType === 'login') {
        this.authService.loginCandidate(email, senha).subscribe({
          next: () => this.router.navigate(['auth/candidato/login']),
          error: (error: any) => console.error('Erro ao fazer login', error)
        });
      } else {
        if (this.candidateForm.hasError('passwordMismatch') || this.candidateForm.hasError('emailMismatch')) {
          return;
        }

        // Código para registrar o usuário aqui
        const { nome, cpf, email, emailConfirm, senha, senhaConfirm } = this.candidateForm.value;
        this.authService.registerCandidate(nome, cpf, email, emailConfirm, senha, senhaConfirm).subscribe({
          next: () => this.router.navigate(['auth/candidato/registrar']), // Atualize para a rota de sucesso ou onde quiser redirecionar
          error: (error: any) => console.error('Erro ao registrar', error)
        });
      }
    } else {
      this.candidateForm.markAllAsTouched();
    }
  }
  navigateTo(userType: 'candidato'): void {
    if (this.userType) {
      const route = `/auth/${this.userType}/${userType}`;
      this.router.navigate([route]);
    } else {
      console.error('Tipo de usuário não definido');
    }
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
    const storedFormData = localStorage.getItem('candidateFormData');
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      this.candidateForm.patchValue(formData);
    }
  }

  // Salva o estado do formulário no localStorage
  saveFormState(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('formState', JSON.stringify(this.candidateForm.value));
    }
  }

  saveFormData(): void {
    if (this.candidateForm.valid) {
      const formData = this.candidateForm.getRawValue();
      localStorage.setItem('candidateFormData', JSON.stringify(formData));
    }
  }
}
