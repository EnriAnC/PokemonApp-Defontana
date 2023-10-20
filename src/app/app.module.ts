import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { favoritePokemonReducer } from './shared/store/favorite-pokemon.reducer';
import { SharedModule } from './shared/shared.module';
import { PokemonsModule } from './modules/pokemons/pokemons.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ favorites: favoritePokemonReducer }, {}),

    SharedModule,
    PokemonsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
