import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestCaseListComponent } from './test-case-list/test-case-list.component';
import { NewTestCaseComponent } from './new-test-case/new-test-case.component';
import { TestReportComponent } from './test-report/test-report.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'test-cases', component: TestCaseListComponent, canActivate: [AuthGuard] },
  { path: 'new-test-case', component: NewTestCaseComponent, canActivate: [AuthGuard] },
  { path: 'test-report', component: TestReportComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }