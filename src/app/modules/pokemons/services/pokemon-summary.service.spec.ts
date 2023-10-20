import { TestBed } from '@angular/core/testing';

import { PokemonSummaryService } from './pokemon-summary.service';

describe('PokemonSummaryService', () => {
  let service: PokemonSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
