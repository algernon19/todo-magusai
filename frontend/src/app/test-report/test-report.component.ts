import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css']
})
export class TestReportComponent {
  constructor(private router: Router) {}

  download(type: string) {
    alert('Letöltés: ' + type.toUpperCase());
  }

  navigateBack() {
    this.router.navigate(['/test-cases']);
  }
}