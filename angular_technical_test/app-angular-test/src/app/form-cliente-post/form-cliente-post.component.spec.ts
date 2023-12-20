import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClientePostComponent } from './form-cliente-post.component';

describe('FormClientePostComponent', () => {
  let component: FormClientePostComponent;
  let fixture: ComponentFixture<FormClientePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClientePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormClientePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
