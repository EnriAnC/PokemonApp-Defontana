// pokemon-summary.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { PokemonService } from './pokemon-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonSummaryService {
  private summary: { [key: string]: number } = {};
  private allPokemonNamesSubject = new BehaviorSubject<string[]>([]);

  constructor(private pokemonService: PokemonService) {}

  loadSummary(totalPokemons: number = 1292): void {
    this.fetchPokemonNames(totalPokemons).subscribe((names) => {
      this.allPokemonNamesSubject.next(names);
      // console.log('allPokemonNames: ', names);
    });
  }

  private fetchPokemonNames(totalPokemons: number): Observable<string[]> {
    const limitPokemonsFromRequest = 20;
    const numPages = Math.ceil(totalPokemons / limitPokemonsFromRequest);

    const requests: Observable<string[]>[] = [];

    for (let i = 1; i <= numPages; i++) {
      const request = this.pokemonService
        .getPokemons(i, limitPokemonsFromRequest)
        .pipe(
          map((response) =>
            response.results.map((pokemon: any) => {
              const firstLetter = pokemon.name.charAt(0).toUpperCase();
              this.summary[firstLetter] = (this.summary[firstLetter] || 0) + 1;
              return pokemon.name;
            })
          )
        );
      requests.push(request);
    }

    return forkJoin(requests).pipe(
      map((responses: any) => [].concat(...responses))
    );
  }

  getPokemonNames(): Observable<string[]> {
    return this.allPokemonNamesSubject.asObservable();
  }

  getSummary(): any {
    return this.summary;
  }
}
