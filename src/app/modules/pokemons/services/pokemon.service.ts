// pokemon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Pokemon as IPokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('offset', `${(page - 1) * pageSize}`)
      .set('limit', `${pageSize}`);

    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  getPokemonByName(searchTerm: string): Observable<IPokemon> {
    return this.http.get<any>(`${this.apiUrl}/${searchTerm}`);
  }

  getPokemonByUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
