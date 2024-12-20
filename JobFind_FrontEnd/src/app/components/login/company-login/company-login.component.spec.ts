import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyLoginComponent } from './company-login.component';

describe('CompanyComponent', () => {
  let component: CompanyLoginComponent;
  let fixture: ComponentFixture<CompanyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
