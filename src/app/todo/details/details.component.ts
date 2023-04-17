import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/shared/todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  selectedTodo!: Todo;
  selectedIndex!: number;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.selectedTodo = this.todoService.getTodo(+params['index']);
      if (this.selectedTodo === undefined) {
        this.router.navigate(['/todos']);
        return;
      }
      this.selectedIndex = +params['index'];
      this.isLoading = false;
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.todoService.deleteTodo(this.selectedIndex);
  }
}
