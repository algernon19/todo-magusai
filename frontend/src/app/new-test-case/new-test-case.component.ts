import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestCaseService, TestCasePayload } from '../services/test-case.service';

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
  saving = false;

  constructor(private testCaseService: TestCaseService, public router: Router) {}

  addStep() {
    if (this.step.trim()) {
      this.testCase.steps.push({ number: this.stepNumber, text: this.step.trim() });
      this.stepNumber++;
      this.step = '';
    }
  }

  removeStep(index: number) {
    this.testCase.steps.splice(index, 1);
    this.testCase.steps.forEach((s, i) => s.number = i + 1);
    this.stepNumber = this.testCase.steps.length + 1;
  }

  save() {
    this.errorMessage = '';
    if (!this.testCase.title.trim()) {
      this.errorMessage = 'A teszteset címe kötelező!';
      return;
    }
    this.saving = true;

    const payload: TestCasePayload = {
      title: this.testCase.title,
      description: this.testCase.description,
      preconditions: this.testCase.preconditions,
      priority: this.mapPriority(this.testCase.priority),
      status: this.mapStatus(this.testCase.status),
      steps: this.testCase.steps.map(s => ({
        action: s.text,
        expected_result: ''
      })),
      category: this.testCase.category
    };

    this.testCaseService.createTestCase(payload).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/test-cases']);
      },
      error: (err) => {
        this.errorMessage = 'Hiba történt: ' + (err.error?.message || err.message);
        this.saving = false;
      }
    });
  }

  private mapPriority(priority: string): string {
    switch (priority) {
      case 'Magas': return 'high';
      case 'Közepes': return 'medium';
      case 'Alacsony': return 'low';
      default: return 'medium';
    }
  }

  private mapStatus(status: string): string {
    switch (status) {
      case 'Vázlat': return 'draft';
      case 'Kész': return 'ready';
      case 'Elavult': return 'obsolete';
      default: return 'draft';
    }
  }
}
