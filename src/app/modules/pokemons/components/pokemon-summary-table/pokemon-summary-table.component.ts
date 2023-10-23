// pokemon-summary-table.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonService } from '../../services/pokemon-api.service';
import { PokemonSummaryService } from '../../services/pokemon-summary.service';

@Component({
  selector: 'app-pokemon-summary-table',
  templateUrl: './pokemon-summary-table.component.html',
  styleUrls: ['./pokemon-summary-table.component.scss'],
})
export class PokemonSummaryTableComponent implements OnInit {
  summary: any = {};

  constructor(private pokemonSummaryService: PokemonSummaryService) {}

  ngOnInit(): void {
    this.pokemonSummaryService.loadSummary();
    this.summary = this.pokemonSummaryService.getSummary();
  }
}
