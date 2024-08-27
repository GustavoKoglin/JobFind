import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAIComponent } from './job-ai.component';

describe('JobAIComponent', () => {
  let component: JobAIComponent;
  let fixture: ComponentFixture<JobAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
