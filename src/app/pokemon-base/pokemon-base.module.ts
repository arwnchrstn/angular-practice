import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonContainerComponent } from '../pokemon-container/pokemon-container.component';
import { PokemonService } from '../service/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PokemonContainerComponent
  ],
  imports: [
    CommonModule, HttpClientModule, FormsModule
  ],
  exports: [
    PokemonContainerComponent
  ],
  providers: [
    PokemonService
  ]
})
export class PokemonBaseModule { }
