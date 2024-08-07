import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from '../../../layouts/nav-menu/nav.menu.component';
import { FooterComponent } from '../../../layouts/footer/footer.component';
import { Toast, ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-register',
  standalone: true,
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
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

  candidateForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoginScreen = false;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      fullName: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
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

  emailMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    return form.get('email')?.value === form.get('confirmEmail')?.value
      ? null : { 'emailMismatch': true };
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const { nome, cpf, email, emailConfirm, senha, senhaConfirm, rememberMe, stayLogged} = this.candidateForm.value;
    if (this.candidateForm.valid) {
      this.authService.registerCompany(nome, cpf, email, emailConfirm, senha, senhaConfirm).subscribe({
        next: () => this.router.navigate(['/auth/candidato/registrar']),
        error: (err) => console.error('Error during registration', err)
      });
    }
  }

  loginWithSocial(platform: string): void {
    // Implementar a lógica para login com redes sociais
    console.log(`Logar com ${platform}`);
  }

  toggleScreen(): void {
    this.isLoginScreen = !this.isLoginScreen; // Alterna entre as telas de login e registro
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



  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
