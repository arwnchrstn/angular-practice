import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  editMode: boolean = false;
  editIndex!: number;
  form!: FormGroup;
  formSelect: string[] = ['Easy', 'Medium', 'Difficult'];
  selectDefault: string = this.formSelect[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  private initForm() {
    let title = '';
    let description = '';
    let level = this.selectDefault;
    let notes: FormControl[] = [];

    if (this.editMode) {
      const selectedTodo = this.todoService.getTodo(this.editIndex);

      title = selectedTodo.title;
      description = selectedTodo.description;
      level = selectedTodo.level;
      selectedTodo.notes.forEach((note) => {
        notes.push(new FormControl(note, [Validators.required]));
      });
    }

    this.form = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      level: new FormControl(level, [Validators.required]),
      notes: new FormArray(notes),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['index']) this.editMode = true;

      this.editIndex = +params['index'];
    });

    this.initForm();
  }

  get notesArrayControls() {
    return this.form.get('notes') as FormArray;
  }

  onAddNote() {
    this.notesArrayControls.push(new FormControl('', [Validators.required]));
  }

  onDeleteNote(index: number) {
    this.notesArrayControls.removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      console.log(this.form.value);
      this.todoService.updateTodo(this.editIndex, this.form.value);

      return;
    }

    this.todoService.addTodo(this.form.value);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
