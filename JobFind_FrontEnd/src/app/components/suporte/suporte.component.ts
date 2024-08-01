import { Component } from '@angular/core';
import { NavMenuComponent } from "../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../layouts/footer/footer.component";

@Component({
  selector: 'app-suporte',
  standalone: true,
  imports: [NavMenuComponent, FooterComponent],
  templateUrl: './suporte.component.html',
  styleUrl: './suporte.component.scss'
})
export class SuporteComponent {

}
