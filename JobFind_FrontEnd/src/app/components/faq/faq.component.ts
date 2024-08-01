import { Component } from '@angular/core';
import { NavMenuComponent } from "../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../layouts/footer/footer.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NavMenuComponent, FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {

}
