import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { AboutComponent } from './components/about/about.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { SuporteComponent } from './components/suporte/suporte.component';
import { WorkWithUsComponent } from './components/work-with-us/work-with-us.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AuthComponent } from './components/login/auth/auth.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { CandidateLoginComponent } from './components/login/candidate-login/candidate-login.component';
import { CompanyLoginComponent } from './components/login/company-login/company-login.component';
import { CandidateRegisterComponent } from './components/login/candidate-register/candidate-register.component';
import { CompanyRegisterComponent } from './components/login/company-register/company-register.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'vagas', component: JobsComponent },
  { path: 'auth/candidato', component: AuthComponent }, // Página principal de autenticação para candidatos
  { path: 'auth/candidato/login', component: CandidateLoginComponent }, // Página de login para candidatos
  { path: 'auth/candidato/registrar', component: CandidateRegisterComponent }, // Página de registro para candidatos

  { path: 'auth/empresa', component: AuthComponent }, // Página principal de autenticação para empresas
  { path: 'auth/empresa/login', component: CompanyLoginComponent }, // Página de login para empresas
  { path: 'auth/empresa/registrar', component: CompanyRegisterComponent }, // Página de registro para empresas

  { path: 'para-empresas', component: CompaniesComponent },
  { path: 'suporte', component: SuporteComponent },
  { path: 'trabalhe-conosco', component: WorkWithUsComponent },
  { path: 'termos-de-uso', component: TermsOfUseComponent},
  { path: 'politica-de-privacidade', component: PrivacyComponent },
  { path: 'faq', component: FaqComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
