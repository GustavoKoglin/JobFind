import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Dropdowns } from '../../interface/dropdowns.interface';
import { Language } from '../../interface/laguange.interface';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  templateUrl: './nav.menu.component.html',
  styleUrls: ['./nav.menu.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    HttpClientModule,
  ]
})
export class NavMenuComponent implements OnInit {

  dropdowns: Dropdowns = {
    login: false,
    language: false
  };

  currentLanguage: Language = { code: 'pt-br', name: 'Português' };
  languages: Language[] = [
    { code: 'pt-br', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ];

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      const browserLang = this.translateService.getBrowserLang();

      this.currentLanguage = this.languages.find(lang => lang.code === savedLanguage)
        || this.languages.find(lang => lang.code === browserLang)
        || { code: 'pt-br', name: 'Português' };

      this.translateService.setDefaultLang(this.currentLanguage.code);
      this.translateService.use(this.currentLanguage.code);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!event.target || !(event.target as HTMLElement).closest('.dropdown')) {
      this.closeAllDropdowns();
    }
  }

  toggleDropdown(type: 'login' | 'language'): void {
    this.dropdowns[type] = !this.dropdowns[type];
    if (this.dropdowns[type]) {
      this.closeAllDropdownsExcept(type);
    }
  }

  closeAllDropdowns(): void {
    this.dropdowns = {
      login: false,
      language: false
    };
  }

  closeAllDropdownsExcept(exception: 'login' | 'language'): void {
    this.dropdowns = {
      login: exception === 'login' ? this.dropdowns.login : false,
      language: exception === 'language' ? this.dropdowns.language : false
    };
  }

  setLanguage(langCode: string): void {
    this.currentLanguage = this.languages.find(lang => lang.code === langCode) || { code: langCode, name: 'Unknown' };
    this.translateService.use(langCode);
    localStorage.setItem('language', langCode);
    this.router.navigateByUrl(this.router.url);
    this.closeAllDropdowns();
  }

  getAvailableLanguages(): Language[] {
    return this.languages.filter(lang => lang.code !== this.currentLanguage.code);
  }

  selectLoginType(type: 'empresa' | 'candidato'): void {
    this.authService.setLoginType(type);
    this.router.navigate([`/auth/${type}`]);
    this.closeAllDropdowns();
  }
}
