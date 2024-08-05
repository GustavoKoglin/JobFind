import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavMenuComponent } from "../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../layouts/footer/footer.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    NavMenuComponent,
    FooterComponent
],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
