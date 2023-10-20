import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPrincipalComponent } from './layout-principal.component';

describe('LayoutPrincipalComponent', () => {
  let component: LayoutPrincipalComponent;
  let fixture: ComponentFixture<LayoutPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutPrincipalComponent]
    });
    fixture = TestBed.createComponent(LayoutPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
