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
  selector: 'app-company-register',
  standalone: true,
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
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
export class CompanyRegisterComponent implements OnInit {

  companyForm!: FormGroup;
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
    this.companyForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.emailMatchValidator, this.passwordMatchValidator] });

    // Subscribing to form value changes
    this.companyForm.valueChanges.subscribe(() => {
      this.companyForm.get('confirmEmail')?.updateValueAndValidity();
      this.companyForm.get('confirmPassword')?.updateValueAndValidity();
    });
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


  toggleForm(type: 'login' | 'registrar'): void {
    if (type === 'registrar') {
      this.router.navigate(['/auth/empresa/registrar']); // Redireciona para a página de registro
    } else {
      this.router.navigate(['/auth/empresa/login']); // Redireciona para a página de login
    }
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
    if (this.companyForm.valid) {
      const { razaoSocial, cnpj, email, emailConfirm, senha, senhaConfirm } = this.companyForm.value;
      this.authService.registerCompany(razaoSocial, cnpj, email, emailConfirm, senha, senhaConfirm).subscribe({
        next: () => this.router.navigate(['/auth/empresa/login']), // Redireciona para a página de login após registro
        error: (err) => console.error('Error during registration', err)
      });
    }
  }

  loginWithSocial(platform: string): void {
    // Implementar a lógica para login com redes sociais
    console.log(`Logar com ${platform}`);
  }

  toggleScreen(): void {
    this.isLoginScreen = !this.isLoginScreen;
    if (this.isLoginScreen) {
      this.router.navigate(['/auth/empresa/login']); // Redireciona para a página de login
    } else {
      this.router.navigate(['/auth/empresa/registrar']); // Redireciona para a página de registro
    }
  }

  private initializeForm(): void {
    this.companyForm = this.fb.group({
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
