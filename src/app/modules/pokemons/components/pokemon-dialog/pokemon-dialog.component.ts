import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { DialogPokemonService } from '../../services/pokemon-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.scss'], // Asume que tienes estilos para el diálogo
})
export class PokemonDialogComponent implements OnDestroy {
  @Output() closeDialog = new EventEmitter<void>();

  selectedPokemon!: Pokemon | null;
  private subscription: Subscription;

  constructor(private pokemonService: DialogPokemonService) {
    this.subscription = this.pokemonService
      .getSelectedPokemon()
      .subscribe((pokemon) => {
        this.selectedPokemon = pokemon;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeModal() {
    this.closeDialog.emit();
    document.body.parentElement!.classList.remove('no-scroll');
  }

  preventDefault(event: Event) {
    event.stopPropagation();
  }
}
