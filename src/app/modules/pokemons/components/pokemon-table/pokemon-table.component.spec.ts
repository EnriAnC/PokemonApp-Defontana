import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTableComponent } from './pokemon-table.component';

describe('PokemonTableComponent', () => {
  let component: PokemonTableComponent;
  let fixture: ComponentFixture<PokemonTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonTableComponent]
    });
    fixture = TestBed.createComponent(PokemonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
