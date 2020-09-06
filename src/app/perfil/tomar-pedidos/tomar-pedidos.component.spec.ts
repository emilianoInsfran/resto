import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarPedidosComponent } from './tomar-pedidos.component';

describe('TomarPedidosComponent', () => {
  let component: TomarPedidosComponent;
  let fixture: ComponentFixture<TomarPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomarPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
