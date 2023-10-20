import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSummaryTableComponent } from './pokemon-summary-table.component';

describe('PokemonSummaryTableComponent', () => {
  let component: PokemonSummaryTableComponent;
  let fixture: ComponentFixture<PokemonSummaryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonSummaryTableComponent]
    });
    fixture = TestBed.createComponent(PokemonSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
