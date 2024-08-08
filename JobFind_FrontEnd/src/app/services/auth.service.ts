import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CandidateRegistration } from './../interface/candidateRegistraton.interface';
import { Router } from '@angular/router';

// Define o serviço como injetável
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginWithSocial(provider: string) {
    throw new Error('Method not implemented.');
  }

  private userTypeSubject = new BehaviorSubject<'empresa' | 'candidato'>('candidato');

  private baseUrl = 'http://yourapiurl.com/auth'; // URL base para as requisições de autenticação

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  setLoginType(type: 'empresa' | 'candidato'): void {
    this.userTypeSubject.next(type);
    localStorage.setItem('userType', type);
  }

  getLoginType(): Observable<'empresa' | 'candidato'> {
    const userType = localStorage.getItem('userType') as 'empresa' | 'candidato' || 'candidato';
    this.userTypeSubject.next(userType);
    return this.userTypeSubject.asObservable();
  }

  // Cria formulário de login para candidato
  private candidateLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Cria formulário de registro para candidato
  private candidateRegistrationForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Cria formulário de login para empresa
  private companyLoginForm(): FormGroup {
    return this.fb.group({
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailConfir: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  // Cria formulário de registro para empresa
  private companyRegistrationForm(): FormGroup {
    return this.fb.group({
      cnpj: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailConfir: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    // Implemente a verificação do token de autenticação aqui
    return false;
  }

  // Método para verificar se o e-mail já está cadastrado
  isEmailTaken(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-email/${email}`);
  }

  // Método para tratar erros de requisição HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  loginCandidate(email: string, password: string, cpf: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidato/login`, { email, password, cpf })
      .pipe(catchError(this.handleError));
  }

  // Método para login de empresa
  loginCompany(email: string, password: string, cnpj: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/empresa/login`, { email, cnpj, password })
      .pipe(catchError(this.handleError));
  }

  // Método para registrar um novo candidato
  registerCandidate(nome: string, cpf: number, email: string, emailConfirm: string, senha: string, senhaConfirm: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidato/registrar`, { nome, cpf, email, emailConfirm, senha, senhaConfirm })
      .pipe(catchError(this.handleError));
  }

  // Método para registrar uma nova empresa
  registerCompany(razaoSocial: string, cnpj: number, email: string, emailConfirm: string, senha: string, senhaConfirm: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/empresa/registrar`, { razaoSocial, cnpj, email, emailConfirm, senha, senhaConfirm })
      .pipe(catchError(this.handleError));
  }

  // Método para recuperar senha de candidato
  forgotPasswordCandidate(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidato/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  // Método para recuperar senha de empresa
  forgotPasswordCompany(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/empresa/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  // Método para alterar senha de candidato
  changePasswordCandidate(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidato/change-password`, data)
      .pipe(catchError(this.handleError));
  }

  // Método para alterar senha de empresa
  changePasswordCompany(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/empresa/change-password`, data)
      .pipe(catchError(this.handleError));
  }

  // Método para deslogar o usuário
  logout(): void {
    localStorage.removeItem('authToken'); // Exemplo: remova o token de autenticação
    this.router.navigate(['/auth/candidato/login']); // Redirecione para a página de login
  }
}
