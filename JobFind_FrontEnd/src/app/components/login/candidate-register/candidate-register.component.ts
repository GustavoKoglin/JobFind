import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from '../../../layouts/nav-menu/nav.menu.component';
import { FooterComponent } from '../../../layouts/footer/footer.component';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-register',
  standalone: true,
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    Toast,
    ToastrModule,
    NavMenuComponent,
    FooterComponent
  ]
})
export class CandidateRegisterComponent implements OnInit {

  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  registerUserType = 'register';
  candidateForm!: FormGroup;
  isLoginScreen = false;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmSenha: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.emailMatchValidator, this.passwordMatchValidator] });

    // Subscribing to form value changes
    this.candidateForm.valueChanges.subscribe(() => {
      this.candidateForm.get('confirmEmail')?.updateValueAndValidity();
      this.candidateForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleForm(type: 'login' | 'registrar'): void {
    if (type === 'registrar') {
      this.router.navigate(['/auth/candidato/registrar']); // Redireciona para a página de registro
    } else {
      this.router.navigate(['/auth/candidato/login']); // Redireciona para a página de login
    }
  }

  emailMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    return form.get('email')?.value === form.get('confirmEmail')?.value
      ? null : { 'emailMismatch': true };
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('senha')?.value === form.get('confirmSenha')?.value
      ? null : { 'passwordMismatch': true };
  }


  onSubmit() {
    if (this.registerForm.valid) {
      const {nome, cpf, email, emailConfirm, senha, senhaConfirm } = this.registerForm.value
      this.authService.registerCandidate(nome, cpf, email, emailConfirm, senha, senhaConfirm ).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  loginWithSocial(provider: string) {
    this.authService.loginWithSocial(provider).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  toggleScreen(): void {
    this.isLoginScreen = !this.isLoginScreen;
    if (this.isLoginScreen) {
      this.router.navigate(['/auth/candidato/login']); // Redireciona para a página de login
    } else {
      this.router.navigate(['/auth/candidato/registrar']); // Redireciona para a página de registro
    }
  }

  private initializeForm(): void {
    this.candidateForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.email]],
      cpf: ['',
        [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      senha: ['',
        [Validators.required, Validators.minLength(8)]],
      confirmSenha: ['',
        [Validators.required]],
      rememberMe: [false],
      stayLogged: [false]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // toggleConfirmPasswordVisibility(): void {
  //   this.showConfirmPassword = !this.showConfirmPassword;
  // }
}
