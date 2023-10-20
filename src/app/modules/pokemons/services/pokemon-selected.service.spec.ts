import { TestBed } from '@angular/core/testing';

import { PokemonSelectedService } from './pokemon-selected.service';

describe('PokemonSelectedService', () => {
  let service: PokemonSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
