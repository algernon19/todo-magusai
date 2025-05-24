import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestCaseService, TestCasePayload } from '../services/test-case.service';

@Component({
  selector: 'app-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  styleUrls: ['./test-case-detail.component.css']
})
export class TestCaseDetailComponent implements OnInit {
  testCase: TestCasePayload;
  steps: { action: string; expected_result: string }[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private testCaseService: TestCaseService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.testCaseService.getTestCaseById(id).subscribe({
      next: (res) => {
        this.testCase = res.data || res; // ha a backend {data: ...}-t ad vissza
        // Lépések lekérése
        this.testCaseService.getTestStepsByCaseId(id).subscribe({
          next: (stepRes) => {
            this.steps = stepRes.data || stepRes;
            this.loading = false;
          },
          error: () => {
            this.error = 'Nem sikerült betölteni a lépéseket.';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'Nem sikerült betölteni a tesztesetet.';
        this.loading = false;
      }
    });
  }
}
