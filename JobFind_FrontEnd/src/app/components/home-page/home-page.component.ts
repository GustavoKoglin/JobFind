import { Component } from '@angular/core';
import { NavMenuComponent } from '../../layouts/nav-menu/nav.menu.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Language } from '../../interface/laguange.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavMenuComponent,
    FooterComponent,
    TranslateModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  currentLanguage: Language = { code: 'pt-br', name: 'Português' };
  languages: Language[] = [
    { code: 'pt-br', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ];

  constructor(private translateService: TranslateService, private router: Router) {
    this.translateService.setDefaultLang(this.currentLanguage.code);
    this.translateService.use(this.currentLanguage.code);
  }
  setLanguage(langCode: string): void {
    this.currentLanguage = this.languages.find(lang => lang.code === langCode) || { code: langCode, name: 'Unknown' };
    this.translateService.use(langCode);

    this.router.navigate([`/${langCode}`]);

  }

  getAvailableLanguages(): { code: string; name: string }[] {
    return this.languages.filter(language => language.code !== this.currentLanguage.code);
  }
}
