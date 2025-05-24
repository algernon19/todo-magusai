import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestCaseService, TestCasePayload } from '../services/test-case.service';

@Component({
  selector: 'app-test-case-list',
  templateUrl: './test-case-list.component.html',
  styleUrls: ['./test-case-list.component.css']
})
export class TestCaseListComponent implements OnInit {
  testCases: TestCasePayload[] = [];
  loading = false;
  error = '';

  constructor(private router: Router, private testCaseService: TestCaseService) {}

  ngOnInit() {
    this.fetchTestCases();
  }

  fetchTestCases() {
    this.loading = true;
    this.testCaseService.getAllTestCases().subscribe({
      next: (res) => {
        // Ha res.data létezik, akkor azt add át!
        this.testCases = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Nem sikerült betölteni a teszteseteket.';
        this.loading = false;
      }
    });
  }

  navigateToNew() {
    this.router.navigate(['/new-test-case']);
  }

  navigateToReport() {
    this.router.navigate(['/test-report']);
  }

  navigateToDetail(id?: number) {
    this.router.navigate(['/test-cases', id]);
  }
}
