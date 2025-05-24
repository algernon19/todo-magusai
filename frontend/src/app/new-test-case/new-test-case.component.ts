import { Component } from '@angular/core';

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
    priority: 'Medium',
    status: 'Draft',
    steps: [] as { number: number, text: string }[]
  };
  stepNumber = 1;
  step = '';

  addStep() {
    if (this.step) {
      this.testCase.steps.push({ number: this.stepNumber, text: this.step });
      this.stepNumber++;
      this.step = '';
    }
  }

  save() {
    // Itt lehetne backendre küldeni vagy listához adni
    alert('Test case saved!');
  }
}
