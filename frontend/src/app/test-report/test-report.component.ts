import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestCaseService } from '../services/test-case.service';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css']
})
export class TestReportComponent {
  constructor(private router: Router, private testCaseService: TestCaseService) {}

  download(type: string) {
    alert('Letöltés: ' + type.toUpperCase());
  }

  navigateBack() {
    this.router.navigate(['/test-cases']);
  }

  exportXml() {
    this.testCaseService.exportTestCasesXml().subscribe(blob => {
      this.downloadFile(blob, 'tesztesetek.xml');
    });
  }

  exportExcel() {
    this.testCaseService.exportTestCasesExcel().subscribe(blob => {
      this.downloadFile(blob, 'tesztesetek.xlsx');
    });
  }

  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}