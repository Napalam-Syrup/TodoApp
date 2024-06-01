import { Component, EventEmitter, Output } from '@angular/core';
import { TodoListService } from '../services/todo-list-service';
import { TodoItemDTO } from '../model/todo-item-dto';


@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.scss'
})
export class AddTodoFormComponent {
  todoTitle: string = '';
  todoDescription: string = '';

  @Output() dataEmitter: EventEmitter<TodoItemDTO> = new EventEmitter<TodoItemDTO>();

  constructor(private todoListService : TodoListService) {
    return;
  }

  onSubmit() {
    this.todoListService.addTodoList(this.todoTitle, this.todoDescription).subscribe(response => {
      this.dataEmitter.emit(response)
    });
    this.todoTitle = '';
    this.todoDescription = '';
  }
}
