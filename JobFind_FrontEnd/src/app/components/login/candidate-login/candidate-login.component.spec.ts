import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateLoginComponent } from './candidate-login.component';

describe('CandidateComponent', () => {
  let component: CandidateLoginComponent;
  let fixture: ComponentFixture<CandidateLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
