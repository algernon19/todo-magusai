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

  // Szerkesztés gomb: navigálás a részletező oldalra
  editTestCase(id?: number) {
    if (id) {
      this.router.navigate(['/test-cases', id]);
    }
  }

  // Törlés gomb: teszteset törlése és lista frissítése
  deleteTestCase(id?: number) {
    if (!id) return;
    if (confirm('Biztosan törölni szeretnéd ezt a tesztesetet?')) {
      this.testCaseService.deleteTestCase(id).subscribe({
        next: () => {
          this.fetchTestCases();
        },
        error: () => {
          this.error = 'Nem sikerült törölni a tesztesetet.';
        }
      });
    }
  }
}
