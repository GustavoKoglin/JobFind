import { Component } from '@angular/core';
import { NavMenuComponent } from "../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../layouts/footer/footer.component";

@Component({
  selector: 'app-work-with-us',
  standalone: true,
  imports: [NavMenuComponent, FooterComponent],
  templateUrl: './work-with-us.component.html',
  styleUrl: './work-with-us.component.scss'
})
export class WorkWithUsComponent {

}
