// modal-pokemon.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class DialogPokemonService {
  private selectedPokemonSource = new BehaviorSubject<Pokemon | null>(null);

  setSelectedPokemon(pokemon: Pokemon | null) {
    this.selectedPokemonSource.next(pokemon);
  }

  getSelectedPokemon(): Observable<Pokemon | null> {
    return this.selectedPokemonSource.asObservable();
  }
}
