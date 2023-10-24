import {
  Pokemon,
  PokemonCoreInfo,
} from 'src/app/modules/pokemons/models/pokemon';

// favorite-pokemon.state.ts
export interface FavoritePokemonState {
  favorites: Pokemon[] | PokemonCoreInfo[];
}

export const initialFavoritePokemonState: FavoritePokemonState = {
  favorites: [],
};
