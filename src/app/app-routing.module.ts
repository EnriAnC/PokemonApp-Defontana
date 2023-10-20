import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrincipalComponent } from './modules/pokemons/pages/layout-principal/layout-principal.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPrincipalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
