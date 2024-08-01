import { Component } from '@angular/core';
import { NavMenuComponent } from "../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../layouts/footer/footer.component";

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [NavMenuComponent, FooterComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

}
