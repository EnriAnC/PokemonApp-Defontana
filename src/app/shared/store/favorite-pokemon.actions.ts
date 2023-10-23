// favorite-pokemon.actions.ts
import { createAction, props } from '@ngrx/store';

export const addFavoritePokemon = createAction(
  '[Favorites] Add Favorite Pokemon',
  props<{ pokemon: any }>()
);

export const removeFavoritePokemon = createAction(
  '[Favorites] Remove Favorite Pokemon',
  props<{ pokemon: any }>()
);

export const setFavoritePokemons = createAction(
  '[Favorites] Set Favorite Pokemons',
  props<{ pokemons: any }>()
);
