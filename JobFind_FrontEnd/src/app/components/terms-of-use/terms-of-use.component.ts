import { Component } from '@angular/core';
import { FooterComponent } from "../../layouts/footer/footer.component";
import { NavMenuComponent } from "../../layouts/nav-menu/nav.menu.component";

@Component({
  selector: 'app-terms-of-use',
  standalone: true,
  imports: [
    FooterComponent,
    NavMenuComponent
  ],
  templateUrl: './terms-of-use.component.html',
  styleUrl: './terms-of-use.component.scss'
})
export class TermsOfUseComponent {

}
