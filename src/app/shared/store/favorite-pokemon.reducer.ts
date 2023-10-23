// favorite-pokemon.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
  setFavoritePokemons,
} from './favorite-pokemon.actions';
import { initialFavoritePokemonState } from './favorite-pokemon.state';

export const favoritePokemonReducer = createReducer(
  initialFavoritePokemonState,
  on(addFavoritePokemon, (state, { pokemon }) => {
    const isPokemonInFavorites = state.favorites.some(
      (p) => p.id === pokemon.id
    );
    if (!isPokemonInFavorites) {
      return {
        ...state,
        favorites: [...state.favorites, pokemon],
      };
    }
    return state; // No realizar cambios si el Pokémon ya está en favoritos
  }),

  on(removeFavoritePokemon, (state, { pokemon }) => ({
    ...state,
    favorites: state.favorites.filter((p) => p.name !== pokemon.name),
  })),

  on(setFavoritePokemons, (state, { pokemons }) => ({
    ...state,
    favorites: pokemons, // Sobrescribe la lista de favoritos con la nueva lista
  }))
);
