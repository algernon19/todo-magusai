import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TestCaseStep {
  number: number;
  text: string;
}

export interface TestCasePayload {
  id?: number;
  title: string;
  description: string;
  preconditions: string;
  priority: string;
  status: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
  category: string;
  steps?: { action: string; expected_result: string }[]; // csak ha külön lekéred és hozzárendeled
}

@Injectable({ providedIn: 'root' })
export class TestCaseService {
  private baseUrl = `${window.location.origin}/api`;

  constructor(private http: HttpClient) {}

  createTestCase(payload: TestCasePayload): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/testcases`, payload, { headers });
  }

  getAllTestCases() {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<any>(`${this.baseUrl}/testcases`, { headers });
  }

  exportTestCasesXml(): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.baseUrl}/reports/testcases/xml`, { headers, responseType: 'blob' });
  }

  exportTestCasesExcel(): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.baseUrl}/reports/testcases/excel`, { headers, responseType: 'blob' });
  }

  getTestCaseById(id: number) {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<any>(`${this.baseUrl}/testcases/${id}`, { headers });
  }

  getTestStepsByCaseId(testCaseId: number) {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<any>(`${this.baseUrl}/testcases/${testCaseId}/steps`, { headers });
  }

  deleteTestCase(id: number) {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.delete(`${this.baseUrl}/testcases/${id}`, { headers });
  }
}