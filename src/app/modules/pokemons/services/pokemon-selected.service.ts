// pokemon-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonSelectedService {
  private selectedPokemonSource = new BehaviorSubject<any>(null);
  selectedPokemon$ = this.selectedPokemonSource.asObservable();

  setSelectedPokemon(pokemon: any) {
    this.selectedPokemonSource.next(pokemon);
  }
}
