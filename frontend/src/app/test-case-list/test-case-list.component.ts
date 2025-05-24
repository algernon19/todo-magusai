import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-case-list',
  templateUrl: './test-case-list.component.html',
  styleUrls: ['./test-case-list.component.css']
})
export class TestCaseListComponent {
  testCases = [
    { title: 'Demo test', priority: 'High', status: 'Draft', createdAt: '14 May, 2021' },
    { title: 'Application to test', priority: 'High', status: 'Draft', createdAt: '4 July, 2021' },
    { title: 'Test Soft', priority: 'Medium', status: 'Low', createdAt: '11 Jan, 2021' },
    { title: 'Soire test', priority: 'Draft', status: 'Tester', createdAt: '15 May, 2021' }
  ];

  constructor(private router: Router) {}

  navigateToNew() {
    this.router.navigate(['/new-test-case']);
  }

  navigateToReport() {
    this.router.navigate(['/test-report']);
  }
}
