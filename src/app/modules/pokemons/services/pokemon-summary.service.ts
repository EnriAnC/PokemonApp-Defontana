// pokemon-summary.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonSummaryService {
  private summary: any = {};
  private allPokemonNamesSubject = new BehaviorSubject<string[]>([]);
  allPokemonNames$ = this.allPokemonNamesSubject.asObservable();

  constructor(private pokemonService: PokemonService) {}

  loadSummary(totalPokemons: number = 1292): void {
    this.fetchPokemonNames(totalPokemons).subscribe((names) => {
      this.allPokemonNamesSubject.next(names);
      // console.log('allPokemonNames: ', this.allPokemonNames);
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
    return this.allPokemonNames$;
  }

  getSummary(): any {
    return this.summary;
  }

  // private allPokemonNames: string[] = [];
  // private summary: any = {};
  // private pokemonNamesSubject = new BehaviorSubject<string[]>([]);
  // pokemonNames$ = this.pokemonNamesSubject.asObservable();

  // constructor(private pokemonService: PokemonService) {}

  // loadSummary(totalPokemons: number = 1292): void {
  //   this.summary = {};
  //   this.allPokemonNames = [];

  //   const limitPokemonsFromRequest = 20;
  //   const numPages = Math.ceil(totalPokemons / limitPokemonsFromRequest);

  //   const requests = [];

  //   for (let i = 1; i <= numPages; i++) {
  //     const request = this.pokemonService.getPokemons(
  //       i,
  //       limitPokemonsFromRequest
  //     );
  //     requests.push(request);
  //   }

  //   forkJoin(requests).subscribe((responses) => {
  //     responses.forEach((response) => {
  //       if (response && response.results) {
  //         response.results.forEach((pokemon: any) => {
  //           this.allPokemonNames.push(pokemon.name);
  //           const firstLetter = pokemon.name.charAt(0).toUpperCase();
  //           this.summary[firstLetter] = (this.summary[firstLetter] || 0) + 1;
  //         });
  //       }
  //     });
  //     this.emitPokemonNames(this.allPokemonNames);
  //   });
  // }

  // private emitPokemonNames(names: string[]): void {
  //   this.pokemonNamesSubject.next(names);
  // }

  // getSummary(): any {
  //   return this.summary;
  // }
}
