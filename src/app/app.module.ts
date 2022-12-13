import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { BillCalculatorBaseModule } from './bill-calculator-base/bill-calculator-base.module'
import { TodoService } from './service/todo.service';
import { PokemonBaseModule } from './pokemon-base/pokemon-base.module';

@NgModule({
  declarations: [AppComponent, TodoItemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BillCalculatorBaseModule, PokemonBaseModule],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
