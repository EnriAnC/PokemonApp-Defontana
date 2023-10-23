import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonDialogComponent } from './components/pokemon-dialog/pokemon-dialog.component';
import { PokemonFavoritesComponent } from './components/pokemon-favorites/pokemon-favorites.component';
import { PokemonSummaryTableComponent } from './components/pokemon-summary-table/pokemon-summary-table.component';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { LayoutPrincipalComponent } from './pages/layout-principal/layout-principal.component';
import { ChunkPipe } from './pipes/chunk-pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';

@NgModule({
  declarations: [
    PokemonTableComponent,
    PokemonDetailComponent,
    PokemonFavoritesComponent,
    PokemonDialogComponent,
    PokemonSummaryTableComponent,
    LayoutPrincipalComponent,
    ChunkPipe,
    PokemonSearchComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [LayoutPrincipalComponent],
})
export class PokemonsModule {}
