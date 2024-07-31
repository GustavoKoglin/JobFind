import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomePageComponent } from "./components/home-page/home-page.component";
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/login/auth/auth.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    HomePageComponent,
    HttpClientModule,
    ToastrModule,
    RouterLink,
    Toast,
    TranslateModule,
    AuthComponent
  ],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(private toastr: ToastrService, private translate: TranslateService) {}

  showSuccess() {
    this.toastr.success(
      this.translate.instant('pages.translate.contato.sucesso'),
      'Success',
      {
        positionClass: 'toast-top-center',
        progressBar: true,
        progressAnimation: 'decreasing'
      }
    );
  }

  showError() {
    this.toastr.error(
      this.translate.instant('pages.translate.contato.preenchaTodosOsCampos'),
      'Error',
      {
        positionClass: 'toast-top-center',
        progressBar: true,
        progressAnimation: 'decreasing'
      }
    );
  }
}
