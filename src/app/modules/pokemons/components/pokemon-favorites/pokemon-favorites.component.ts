import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { removeFavoritePokemon } from '../../../../shared/store/favorite-pokemon.actions';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-favorites',
  templateUrl: './pokemon-favorites.component.html',
  styleUrls: ['./pokemon-favorites.component.scss'],
})
export class PokemonFavoritesComponent {
  favoritePokemons$!: Observable<Pokemon[]>;

  constructor(private store: Store<{ favorites: any }>) {
    this.favoritePokemons$ = store.pipe(
      select('favorites'),
      map((favorites) => {
        console.log('Favorites: ', { favorites });
        return Object.values(favorites.favorites);
      })
    );
  }

  onRemoveFavorite(pokemon: any): void {
    this.store.dispatch(removeFavoritePokemon({ pokemon }));
  }

  onPokemonClicked(pokemon: any): void {
    alert(pokemon.name);
  }
}
