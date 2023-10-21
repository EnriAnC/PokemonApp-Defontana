import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { DialogPokemonService } from '../../services/pokemon-dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.scss'], // Asume que tienes estilos para el diálogo
})
export class PokemonDialogComponent {
  @Input() pokemon: Pokemon | null = null;
  @Output() close = new EventEmitter<void>();

  selectedPokemon: any;

  constructor(private pokemonService: DialogPokemonService) {
    this.pokemonService.selectedPokemon$.subscribe((pokemon) => {
      this.selectedPokemon = pokemon;
    });
  }

  closeModal(event: Event) {
    this.close.emit();
    document.body.parentElement!.classList.remove('no-scroll');
  }

  preventDefault(event: Event) {
    event.stopPropagation();
  }
}
