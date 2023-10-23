import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirstPokemonRequestService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private data: any; // Almacena los datos de la primera llamada
  private dataSubject = new BehaviorSubject<any>(null);
  data$: Observable<any> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData(); // Realiza la primera llamada al constructor
  }

  private loadData() {
    // Realiza la llamada al endpoint solo si los datos aún no están cargados
    if (!this.data) {
      this.http.get(this.apiUrl).subscribe((response: any) => {
        console.log('response: ', response);
        this.data = response;
        this.dataSubject.next(this.data); // Notifica a los suscriptores con los datos cargados
      });
    }
  }
}
