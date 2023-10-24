import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})
export class PokemonSearchComponent {
  @Output() searchResults: EventEmitter<Array<Form>> = new EventEmitter<
    Array<any>
  >();
  @Input() allPokemonNames!: Array<string>;
  matchingPokemonNames!: Array<string>;
  showRecommendations!: boolean;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      searchTerm: ['', [Validators.required]],
    });
  }

  onSearch(): void {
    const searchTerm = this.formGroup
      .get('searchTerm')!
      .value.trim()
      .toLowerCase(); // Convertir a minúsculas y eliminar espacios en blanco
    if (searchTerm === '') {
      this.searchResults.emit([]);
    } else {
      const matchingPokemon = this.allPokemonNames.filter((name) =>
        name.toLowerCase().startsWith(searchTerm)
      );

      if (matchingPokemon.length > 0) {
        const results = matchingPokemon.map((name): Form => {
          return {
            name: name,
            url: `https://pokeapi.co/api/v2/pokemon/${name}`,
          };
        });
        this.searchResults.emit(results);
      } else {
        this.searchResults.emit([
          { name: 'No se encontró el pokemon', url: '' },
        ]);
      }
    }
  }

  onSearchTermChanged(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    // console.log('onSearchTermChanged: ', value);
    if (value) {
      this.matchingPokemonNames = this.allPokemonNames.filter((name) =>
        name.toLowerCase().startsWith(value.toLowerCase())
      );
      // Aquí puedes mostrar las recomendaciones basadas en matchingPokemonNames
      this.showRecommendations = this.matchingPokemonNames.length > 0;
    } else {
      this.showRecommendations = false;
    }
  }

  onCloseRecommendations(): void {
    setTimeout(() => {
      this.showRecommendations = false;
    }, 200);
  }

  onRecommendationClick(name: string): void {
    this.formGroup.get('searchTerm')!.setValue(name);
    this.showRecommendations = false; // Oculta las recomendaciones cuando se hace clic
  }

  onCleanForm(): void {
    this.formGroup.get('searchTerm')!.setValue('');
    this.showRecommendations = false;
  }
}
