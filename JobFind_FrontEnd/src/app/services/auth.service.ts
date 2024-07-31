import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define o serviço como injetável
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://yourapiurl.com/auth'; // URL base para as requisições de autenticação

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

   // Método para login de candidato
   login(data: LoginData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/candidato/login`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

   // Método para registro de empresa
   register(data: EmpresaRegistration): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/empresa/registrar`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para registrar candidato
  registerCandidate(data: CandidateRegistration) {
    return this.http.post(`${this.baseUrl}/candidato/registrar`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para registrar empresa
  registerEmpresa(data: EmpresaRegistration) {
    return this.http.post(`${this.baseUrl}/empresa/registrar`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para login de candidato
  loginCandidate(data: LoginData) {
    return this.http.post(`${this.baseUrl}/candidato/login`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para login de empresa
  loginEmpresa(data: LoginData) {
    return this.http.post(`${this.baseUrl}/empresa/login`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  private isLoggedIn = false; // Variável para armazenar o status de login
  private userType?: 'empresa' | 'candidato'; // Tipo de usuário logado

  // Define o tipo de usuário (empresa ou candidato)
  setLoginType(type: 'empresa' | 'candidato') {
    this.userType = type;
  }

  // Retorna o tipo de usuário logado
  getLoginType(): 'empresa' | 'candidato' | undefined {
    return this.userType;
  }

  // Define o status de login (logado ou não)
  setLoginStatus(status: boolean) {
    this.isLoggedIn = status;
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Cria um formulário de autenticação com validação
  createAuthForm(type: 'login' | 'registrar'): FormGroup {
    const form = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de e-mail com validações
      confirmEmail: [''], // Campo de confirmação de e-mail
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]], // Campo de senha com validações
      confirmSenha: [''], // Campo de confirmação de senha
      rememberMe: [false], // Campo para "lembrar-me"
      stayLogged: [false] // Campo para "permanecer logado"
    }, { validators: this.passwordMatchValidator }); // Validador customizado para confirmar senhas
    return form;
  }

  // Validador para verificar se as senhas coincidem
  private passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const senha = formGroup.get('senha')?.value;
    const confirmSenha = formGroup.get('confirmSenha')?.value;

    if (senha && confirmSenha && senha !== confirmSenha) {
      return { passwordMismatch: true }; // Retorna erro se as senhas não coincidirem
    }

    const email = formGroup.get('email')?.value;
    const confirmEmail = formGroup.get('confirmEmail')?.value;

    if (email && confirmEmail && email !== confirmEmail) {
      return { emailMismatch: true }; // Retorna erro se os e-mails não coincidirem
    }

    return null; // Retorna null se não houver erro
  }

  // Tratamento de erros HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}

// Interfaces para tipos de dados
export interface CandidateRegistration {
  email: string;
  senha: string;
  // Outros campos necessários
}

export interface EmpresaRegistration {
  email: string;
  senha: string;
  // Outros campos necessários
}

export interface LoginData {
  email: string;
  senha: string;
}
