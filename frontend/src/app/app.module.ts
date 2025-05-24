import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <-- EZ KELL

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestCaseListComponent } from './test-case-list/test-case-list.component';
import { NewTestCaseComponent } from './new-test-case/new-test-case.component';
import { TestReportComponent } from './test-report/test-report.component';
import { AppRoutingModule } from './app.routing';
import { TestCaseDetailComponent } from './test-case-detail/test-case-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TestCaseListComponent,
    NewTestCaseComponent,
    TestReportComponent,
    TestCaseDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
