// pokemon-summary-table.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PokemonService } from '../../services/pokemon-api.service';
import { PokemonSummaryService } from '../../services/pokemon-summary.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-summary-table',
  templateUrl: './pokemon-summary-table.component.html',
  styleUrls: ['./pokemon-summary-table.component.scss'],
})
export class PokemonSummaryTableComponent implements OnInit, OnDestroy {
  summary: any = {};
  private subscription!: Subscription;

  constructor(private pokemonSummaryService: PokemonSummaryService) {}

  ngOnInit(): void {
    this.subscription = this.pokemonSummaryService
      .loadSummary()
      .subscribe(() => {
        this.summary = this.pokemonSummaryService.getSummary();
        this.subscription.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte si el componente se destruye antes de que termine la suscripción
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
