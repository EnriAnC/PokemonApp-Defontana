// pokemon-table.component.ts
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Store, select } from '@ngrx/store';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from '../../../../shared/store/favorite-pokemon.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pokemon as IPokemon } from '../../models/pokemon';
import { PokemonSelectedService } from '../../services/pokemon-selected.service';
import { PokemonSummaryService } from '../../services/pokemon-summary.service';

import { map } from 'rxjs';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss'],
})
export class PokemonTableComponent implements OnInit {
  pokemons: any = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalPokemons: number = 0;
  selectedPokemon: any;
  formGroup: FormGroup;
  allPokemonNames: string[] = [];
  matchingPokemonNames: string[] = [];
  showRecommendations: boolean = false;
  favoritePokemons: any[] = [];

  constructor(
    private pokemonService: PokemonService,
    private pokemonSelectedService: PokemonSelectedService,
    private pokemonSummaryService: PokemonSummaryService,
    private store: Store<{ favorites: any }>,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      searchTerm: [''], // Aquí puedes aplicar validaciones si es necesario
    });
  }
  ngOnInit(): void {
    this.store.select('favorites').subscribe((favorites) => {
      console.log('Favorites: ', { favorites });
      this.favoritePokemons = Object.values(favorites.favorites);
      this.loadPokemons();
    });
    this.pokemonSummaryService.getPokemonNames().subscribe((names) => {
      this.allPokemonNames = names;
      this.loadPokemons();
    });
  }

  loadPokemons(): void {
    // Calcular los índices de inicio y fin para la paginación
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Obtener los nombres de Pokémon para la página actual
    const pokemonNamesForPage = this.allPokemonNames.slice(
      startIndex,
      endIndex
    );

    // Mapear los nombres a los detalles de Pokémon
    const pokemonsForPage = pokemonNamesForPage.map((name) => {
      const pokemon: any = {
        name: name,
        // Otras propiedades si las tienes
      };

      if (this.isPokemonInFavorites(pokemon)) {
        pokemon.isFavorite = true;
      }

      return pokemon;
    });

    this.pokemons = pokemonsForPage;
    this.totalPokemons = this.allPokemonNames.length;
    this.totalPages = this.totalPokemons
      ? Math.ceil(this.totalPokemons / this.pageSize)
      : 0;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPokemons();
  }

  onSearch(): void {
    this.currentPage = 1;
    const searchTerm = this.formGroup.get('searchTerm')!.value;
    if (searchTerm.trim() == '') return this.loadPokemons();
    if (this.allPokemonNames.includes(searchTerm)) {
      this.pokemons = [
        {
          name: searchTerm,
          url: `https://pokeapi.co/api/v2/pokemon/${searchTerm}`,
        },
      ];
      this.totalPages = 1;
    } else {
      this.totalPages = 1;
      this.pokemons = [{ name: 'No se encontró el Pokémon', url: '' }];
    }
  }

  onSearchTermChanged(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    // console.log('onSearchTermChanged: ', value);
    if (value) {
      this.matchingPokemonNames = this.allPokemonNames.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      // Aquí puedes mostrar las recomendaciones basadas en matchingPokemonNames
      this.showRecommendations = this.matchingPokemonNames.length > 0;
    } else {
      this.showRecommendations = false;
    }
  }

  cleanForm(): void {
    this.formGroup.get('searchTerm')!.setValue('');
    this.showRecommendations = false;
    this.loadPokemons();
  }

  calculateTotalPages(): number {
    return this.totalPokemons
      ? Math.ceil(this.totalPokemons / this.pageSize)
      : 0;
  }

  onSelectPokemon(pokemon: any): void {
    this.pokemonService.getPokemonByName(pokemon.name).subscribe({
      next: (data: IPokemon) => {
        // console.log('OnSelectPokemon: ', data);
        this.pokemonSelectedService.setSelectedPokemon(data);
      },
      error: (error) => {
        console.error(
          'Ocurrió un error al cargar los detalles del Pokémon:',
          error
        );
      },
    });
  }

  onFavoriteClick(pokemon: any, favoriteStar: HTMLElement): void {
    console.log('onFavoriteClick: ', pokemon);
    // Verifica si la clase 'favorite-star' está activa en el elemento
    if (favoriteStar.classList.contains('favorite-star')) {
      // La clase 'favorite-star' está activa, por lo que el Pokémon es un favorito y se debe eliminar.
      this.store.dispatch(removeFavoritePokemon({ pokemon }));
      favoriteStar.classList.remove('favorite-star');
    } else {
      // La clase 'favorite-star' no está activa, por lo que el Pokémon no es un favorito y se debe agregar.
      this.pokemonService.getPokemonByName(pokemon.name).subscribe({
        next: (data) => {
          this.store.dispatch(addFavoritePokemon({ pokemon: data }));
          favoriteStar.classList.add('favorite-star');
        },
        error: (error) => {
          console.error(
            'Ocurrió un error al cargar los detalles del Pokémon:',
            error
          );
        },
      });
    }
  }

  onRecommendationClick(name: string): void {
    this.formGroup.get('searchTerm')!.setValue(name);
    this.showRecommendations = false; // Oculta las recomendaciones cuando se hace clic
  }

  isPokemonInFavorites(pokemon: any): boolean {
    // console.log('isPokemonInFavorites: ', pokemon);
    return this.favoritePokemons.some(
      (favPokemon) => favPokemon.name === pokemon.name
    );
  }
}
