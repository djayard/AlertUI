import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCategoryComponent } from './alert-category.component';

describe('AlertCategoryComponent', () => {
  let component: AlertCategoryComponent;
  let fixture: ComponentFixture<AlertCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
