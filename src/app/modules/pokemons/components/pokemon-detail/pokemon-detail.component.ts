import { Component, Input } from '@angular/core';
import { PokemonSelectedService } from '../../services/pokemon-selected.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  @Input() selectedPokemon: any;
  selectedThumbnail: string | null = null;

  constructor(private pokemonSelectedService: PokemonSelectedService) {}

  ngOnInit(): void {
    this.pokemonSelectedService.selectedPokemon$.subscribe(
      (pokemon: Pokemon) => {
        console.log('Pokemon detail: ', pokemon);
        this.selectedPokemon = pokemon;
        this.selectedThumbnail = pokemon.sprites.front_default;
      }
    );
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  changeMainImage(url: any): void {
    this.selectedThumbnail = url;
  }
}
