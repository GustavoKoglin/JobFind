import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEdidComponent } from './job-edid.component';

describe('JobEdidComponent', () => {
  let component: JobEdidComponent;
  let fixture: ComponentFixture<JobEdidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobEdidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobEdidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
