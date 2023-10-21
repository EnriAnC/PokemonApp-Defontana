import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { removeFavoritePokemon } from '../../../../shared/store/favorite-pokemon.actions';
import { Pokemon } from '../../models/pokemon';
import { DialogPokemonService } from '../../services/pokemon-dialog.service';

@Component({
  selector: 'app-pokemon-favorites',
  templateUrl: './pokemon-favorites.component.html',
  styleUrls: ['./pokemon-favorites.component.scss'],
})
export class PokemonFavoritesComponent {
  favoritePokemons$!: Observable<Pokemon[]>;
  // selectedPokemon: Pokemon | null = null;

  constructor(
    private store: Store<{ favorites: any }>,
    private modalPokemonService: DialogPokemonService
  ) {
    this.favoritePokemons$ = store.pipe(
      select('favorites'),
      map((favorites) => {
        console.log('Favorites: ', { favorites });
        return Object.values(favorites.favorites);
      })
    );
  }

  onRemoveFavorite(pokemon: Pokemon): void {
    this.store.dispatch(removeFavoritePokemon({ pokemon }));
  }

  onPokemonClicked(pokemon: Pokemon): void {
    console.log('Pokemon clicked: ', { pokemon });
    this.modalPokemonService.setSelectedPokemon(pokemon);
  }

  closeDialog(): void {
    // this.selectedPokemon = null;
    this.modalPokemonService.setSelectedPokemon(null);
  }
}
