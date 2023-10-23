// pokemon-table.component.ts
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../services/pokemon-api.service';
import { Store } from '@ngrx/store';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from '../../../../shared/store/favorite-pokemon.actions';
import { Pokemon as IPokemon } from '../../models/pokemon';
import { PokemonSelectedService } from '../../services/pokemon-selected.service';
import { PokemonSummaryService } from '../../services/pokemon-summary.service';

export interface PokemonInTable {
  name: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss'],
})
export class PokemonTableComponent implements OnInit {
  private favoritePokemons: any[] = [];
  private searchResults: any[] = [];

  public pageSize: number = 10;

  public pokemonsInTable: any[] = [];
  public currentPage: number = 1;

  public totalPages: number = 0;
  public allPokemonNames: string[] = [];

  constructor(
    private pokemonService: PokemonService,
    private pokemonSelectedService: PokemonSelectedService,
    private pokemonSummaryService: PokemonSummaryService,
    private store: Store<{ favorites: any }>
  ) {}

  ngOnInit(): void {
    this.store.select('favorites').subscribe((favorites) => {
      // console.log('Favorites: ', { favorites });
      this.favoritePokemons = Object.values(favorites.favorites);
      if (this.pokemonsInTable.length < 1) this.onResetTable();
      else {
        this.chargePokemons(
          this.searchResults.length > 0
            ? this.searchResults
            : this.allPokemonNames
        );
      }
    });

    this.pokemonSummaryService.getPokemonNames().subscribe((names) => {
      this.allPokemonNames = names;
      this.chargePokemons(names);
    });
  }

  private chargePokemons(pokemonsNames: any[]): void {
    // Calcular los índices de inicio y fin para la paginación
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + Number(this.pageSize);

    // Obtener los nombres de Pokémon para la página actual
    const pokemonNamesForPage = pokemonsNames.slice(startIndex, endIndex);

    // Mapear los nombres a los detalles de Pokémon
    const pokemonsForPage = pokemonNamesForPage.map(
      (nameOrPokemon: string | { name: string }) => {
        if (typeof nameOrPokemon === 'string') {
          const pokemon: PokemonInTable = {
            name: nameOrPokemon,
            isFavorite: this.isPokemonInFavorites({
              name: nameOrPokemon as string,
            }),
          };
          return pokemon;
        } else if (typeof nameOrPokemon !== 'string') {
          const pokemon: any = {
            name: nameOrPokemon.name,
            isFavorite: this.isPokemonInFavorites({ name: nameOrPokemon.name }),
          };
          return pokemon;
        }
      }
    );

    this.pokemonsInTable = pokemonsForPage;

    this.calculateTotalPages(pokemonsNames);
  }

  private calculateTotalPages(allPokemons: any[]): void {
    const countPokemons = allPokemons.length;
    this.totalPages = countPokemons
      ? Math.ceil(countPokemons / this.pageSize)
      : 0;
  }

  private isPokemonInFavorites(pokemon: { name: string }): boolean {
    return this.favoritePokemons.some(
      (favPokemon) => favPokemon.name === pokemon.name
    );
  }

  private removeFavorite(pokemon: PokemonInTable): void {
    this.store.dispatch(removeFavoritePokemon({ pokemon }));
  }

  private addFavorite(pokemon: PokemonInTable): void {
    this.pokemonService.getPokemonByName(pokemon.name).subscribe({
      next: (data) => {
        this.store.dispatch(addFavoritePokemon({ pokemon: data }));
      },
      error: (error) => {
        console.error(
          'Ocurrió un error al cargar los detalles del Pokémon:',
          error
        );
      },
    });
  }

  setPageSize(): void {
    this.chargePokemons(
      this.searchResults.length > 0 ? this.searchResults : this.allPokemonNames
    );
  }

  pagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  onSelectPage() {
    this.chargePokemons(
      this.searchResults.length > 0 ? this.searchResults : this.allPokemonNames
    );
  }

  onPageChange(page: number): void {
    this.currentPage = Number(this.currentPage) + Number(page);
    this.chargePokemons(
      this.searchResults.length > 0 ? this.searchResults : this.allPokemonNames
    );
  }

  onSearchResults(results: any): void {
    // console.log('onSearchResults: ', results);
    if (results.length > 0) {
      this.pokemonsInTable = results;
      this.searchResults = results;
      this.currentPage = 1;
      this.chargePokemons(results);
    } else {
      this.onResetTable();
    }
  }

  onResetTable(): void {
    this.searchResults = [];
    this.chargePokemons(this.allPokemonNames);
  }

  onSelectPokemon(pokemon: any): void {
    this.pokemonSelectedService.setSelectedPokemon(pokemon.name);
  }

  onFavoriteClick(pokemon: PokemonInTable): void {
    // console.log('onFavoriteClick: ', pokemon);
    if (pokemon.isFavorite) {
      pokemon.isFavorite = false;
      this.removeFavorite(pokemon);
    } else {
      pokemon.isFavorite = true;
      this.addFavorite(pokemon);
    }
  }
}
