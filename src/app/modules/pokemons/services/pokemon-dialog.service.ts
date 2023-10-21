// modal-pokemon.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class DialogPokemonService {
  private selectedPokemonSource = new BehaviorSubject<any>(null);
  selectedPokemon$ = this.selectedPokemonSource.asObservable();

  setSelectedPokemon(pokemon: Pokemon | null) {
    this.selectedPokemonSource.next(pokemon);
  }
}
