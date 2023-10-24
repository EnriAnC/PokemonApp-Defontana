import { Component, Input, OnDestroy } from '@angular/core';
import { PokemonSelectedService } from '../../services/pokemon-selected.service';
import { Pokemon } from '../../models/pokemon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnDestroy {
  @Input() selectedPokemon: Pokemon | null = null;
  selectedThumbnail: string | null = null;
  private subscription: Subscription | null = null;

  constructor(private pokemonSelectedService: PokemonSelectedService) {}

  ngOnInit(): void {
    if (this.selectedPokemon) return;

    this.pokemonSelectedService.getSelectedPokemon().subscribe((pokemon) => {
      if (!pokemon) return;
      // console.log('Pokemon detail: ', pokemon);
      this.selectedPokemon = pokemon;
      this.selectedThumbnail = pokemon.sprites.front_default;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  changeMainImage(url: any): void {
    this.selectedThumbnail = url;
  }
}
