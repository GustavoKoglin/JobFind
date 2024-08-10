import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NavMenuComponent } from "../../../layouts/nav-menu/nav.menu.component";
import { FooterComponent } from "../../../layouts/footer/footer.component";

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    ToastrModule,
    NavMenuComponent,
    FooterComponent
  ],
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent {

  profilePhotoPreview: string | ArrayBuffer | null = null;
  candidateForm!: FormGroup;

  currentStep: number = 1;
  totalSteps: number = 4;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private translate: TranslateService,
  ) {}

   ngOnInit(): void {
    this.candidateForm = this.fb.group({
      // Step 1 - Personal Information
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      issuingAgency: [''],
      issuingDate: [''],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      phone: [''],
      confirmPhone: [''],
      address: [''],
      number: [''],
      complement: [''],
      zipCode: [''],
      city: [''],
      state: [''],
      country: [''],

      // Step 2 - Professional Experiences
      professionalExperiences: this.fb.array([]),

      // Step 3 - Academic Qualifications
      academicQualifications: this.fb.array([])
    });
  }

  get professionalExperiences(): FormArray {
    return this.candidateForm.get('professionalExperiences') as FormArray;
  }

  get academicQualifications(): FormArray {
    return this.candidateForm.get('academicQualifications') as FormArray;
  }

  get isFirstStep(): boolean {
    return this.currentStep === 1;
  }

  get isLastStep(): boolean {
    return this.currentStep === this.totalSteps;
  }

  get currentFormStepClass(): string {
    return `form-step step-${this.currentStep}`;
  }

  getCurrentStepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'Dados Pessoais';
      case 2: return 'Experiência Profissional';
      case 3: return 'Formação Acadêmica';
      default: return '';
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }


  goToNextStep(): void {
    if (this.candidateForm.valid) {
      this.currentStep++;
      if (this.currentStep > this.totalSteps) {
        this.currentStep = this.totalSteps;
      }
    } else {
      this.toast.error('Please fill all required fields.');
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  addExperience(): void {
    this.professionalExperiences.push(this.fb.group({
      companyName: [''],
      position: [''],
      startDate: [''],
      endDate: ['']
    }));
  }

  removeExperience(index: number): void {
    this.professionalExperiences.removeAt(index);
  }

  addQualification(): void {
    this.academicQualifications.push(this.fb.group({
      institutionName: [''],
      course: [''],
      startDate: [''],
      endDate: ['']
    }));
  }

  removeQualification(index: number): void {
    this.academicQualifications.removeAt(index);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.profilePhotoPreview = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      console.log(this.candidateForm.value);
      this.toast.success(this.translate.instant('pages.translate.candidate.submitSuccess'));
    } else {
      this.toast.error(this.translate.instant('pages.translate.candidate.submitError'));
    }
  }

  get professionalQualifications(): FormArray {
    return this.candidateForm.get('professionalQualifications') as FormArray;
  }

  addProfessionalExperience() {
    this.professionalExperiences.push(
      this.fb.group({
        companyName: ['', Validators.required],
        position: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: [''],
      })
    );
  }

  removeProfessionalExperience(index: number) {
    this.professionalExperiences.removeAt(index);
  }

  addAcademicQualification() {
    this.academicQualifications.push(
      this.fb.group({
        institution: ['', Validators.required],
        degree: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: [''],
      })
    );
  }

  removeAcademicQualification(index: number) {
    this.academicQualifications.removeAt(index);
  }

  addProfessionalQualification() {
    this.professionalQualifications.push(
      this.fb.group({
        title: ['', Validators.required],
        institution: ['', Validators.required],
        dateObtained: ['', Validators.required],
      })
    );
  }

  removeProfessionalQualification(index: number) {
    this.professionalQualifications.removeAt(index);
  }
}
