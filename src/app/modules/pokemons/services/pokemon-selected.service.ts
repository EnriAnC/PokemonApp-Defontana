// pokemon-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError } from 'rxjs';
import { PokemonService } from './pokemon-api.service';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonSelectedService {
  private selectedPokemonSource$ = new BehaviorSubject<Pokemon | null>(null);

  constructor(private pokemonService: PokemonService) {}

  setSelectedPokemon(name: string) {
    this.pokemonService
      .getPokemonByName(name)
      .pipe(
        catchError((error) => {
          console.error(
            'Ocurrió un error al cargar los detalles del Pokémon:',
            error
          );
          return [];
        })
      )
      .subscribe((data: Pokemon) => {
        this.selectedPokemonSource$.next(data);
      });
  }

  getSelectedPokemon(): Observable<Pokemon | null> {
    return this.selectedPokemonSource$.asObservable();
  }
}
