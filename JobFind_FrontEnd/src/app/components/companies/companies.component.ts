import { Component } from '@angular/core';
import { NavMenuComponent } from "../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../layouts/footer/footer.component";

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [NavMenuComponent, FooterComponent],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

}
