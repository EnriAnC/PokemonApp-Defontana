import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { Pokemon, PokemonCoreInfo } from '../../models/pokemon';

import {
  removeFavoritePokemon,
  setFavoritePokemons,
} from '../../../../shared/store/favorite-pokemon.actions';

import { DialogPokemonService } from '../../services/pokemon-dialog.service';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-pokemon-favorites',
  templateUrl: './pokemon-favorites.component.html',
  styleUrls: ['./pokemon-favorites.component.scss'],
})
export class PokemonFavoritesComponent implements OnInit {
  favoritePokemons$!: Observable<Pokemon[]>;

  constructor(
    private store: Store<{ favorites: any }>,
    private dialogPokemonService: DialogPokemonService,
    private localStorageService: LocalStorageService
  ) {
    this.favoritePokemons$ = store.pipe(
      select('favorites'),
      map((favorites) => {
        this.setFavoritePokemonOnLocalStorage(
          this.mapPokemons(favorites.favorites)
        );

        return favorites.favorites;
      })
    );
  }

  ngOnInit(): void {
    // Cargar datos desde el localStorage al iniciar el componente
    const favoritePokemonsFromLocalStorage =
      this.localStorageService.getItem('favoritePokemons');
    if (favoritePokemonsFromLocalStorage) {
      this.store.dispatch(
        setFavoritePokemons({ pokemons: favoritePokemonsFromLocalStorage })
      );
    }
  }

  onRemoveFavorite(pokemon: Pokemon): void {
    this.store.dispatch(removeFavoritePokemon({ pokemon }));
  }

  onPokemonClicked(pokemon: Pokemon): void {
    this.dialogPokemonService.setSelectedPokemon(pokemon);
    document.body.parentElement!.classList.add('no-scroll');
  }

  closeDialog(): void {
    this.dialogPokemonService.setSelectedPokemon(null);
  }

  setFavoritePokemonOnLocalStorage(favorites: PokemonCoreInfo[]): void {
    this.localStorageService.setItem('favoritePokemons', favorites);
  }

  mapPokemons(pokemons: Pokemon[]): PokemonCoreInfo[] {
    return pokemons.map(({ id, name, abilities, stats, sprites }) => ({
      id,
      name,
      abilities,
      stats,
      sprites: { ...sprites, other: {}, versions: {} },
    }));
  }
}
