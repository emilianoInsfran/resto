import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPlatosComponent } from './alta-platos.component';

describe('AltaPlatosComponent', () => {
  let component: AltaPlatosComponent;
  let fixture: ComponentFixture<AltaPlatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPlatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
