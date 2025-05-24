import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-test-case',
  templateUrl: './new-test-case.component.html',
  styleUrls: ['./new-test-case.component.css']
})
export class NewTestCaseComponent {
  testCase = {
    title: '',
    description: '',
    preconditions: '',
    category: 'Authentication',
    priority: 'Közepes',
    status: 'Vázlat',
    steps: [] as { number: number, text: string }[]
  };
  step = '';
  stepNumber = 1;
  errorMessage = '';

  constructor(public router: Router) {}

  addStep() {
    if (this.step.trim()) {
      this.testCase.steps.push({ number: this.stepNumber, text: this.step.trim() });
      this.stepNumber++;
      this.step = '';
    }
  }

  removeStep(index: number) {
    this.testCase.steps.splice(index, 1);
    // újraszámozás
    this.testCase.steps.forEach((s, i) => s.number = i + 1);
    this.stepNumber = this.testCase.steps.length + 1;
  }

  save() {
    this.errorMessage = '';
    if (!this.testCase.title) {
      this.errorMessage = 'A teszteset címe kötelező!';
      return;
    }
    // Itt valósítsd meg a mentést (API hívás vagy service)
    // Sikeres mentés után navigálj vissza a tesztesetekhez:
    this.router.navigate(['/test-cases']);
  }
}
