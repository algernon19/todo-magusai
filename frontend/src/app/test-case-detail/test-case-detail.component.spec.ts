import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseDetailComponent } from './test-case-detail.component';

describe('TestCaseDetailComponent', () => {
  let component: TestCaseDetailComponent;
  let fixture: ComponentFixture<TestCaseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCaseDetailComponent]
    });
    fixture = TestBed.createComponent(TestCaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
