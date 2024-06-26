import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error5Component } from './error5.component';

describe('Error5Component', () => {
  let component: Error5Component;
  let fixture: ComponentFixture<Error5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Error5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Error5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
