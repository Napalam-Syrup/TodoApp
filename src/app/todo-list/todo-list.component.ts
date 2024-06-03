import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../services/todo-list-service';
import { TodoItemIDDTO } from '../model/todo-item-id-dto';
import { TodoItemDTO } from '../model/todo-item-dto';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  todoItems: TodoItemIDDTO[] = [];
  todoTitle: string = '';
  constructor(private todoListService : TodoListService) {
    return;
  }

  ngOnInit():void {
    console.log("test");

    this.todoListService.getTodoList().subscribe(

      (todoItem : TodoItemIDDTO[]) => {
        this.todoItems = todoItem;
      })
  }

  refreshTodo(): void {
    this.todoListService.getTodoList().subscribe(
      (todoItem : TodoItemIDDTO[]) => {
        this.todoItems = todoItem;
      });
  }

  receiveData() {
    this.refreshTodo();
    // Todo: consider simply pushing up the data;
  }

  onChangeComplete(item: TodoItemIDDTO) {
    this.todoListService.changeCompleted(item).subscribe(() => {
      this.refreshTodo()
    })
  }

  onDelete(item: TodoItemIDDTO) {
    this.todoListService.deleteTodoItem(item).subscribe(() => {
      this.refreshTodo();
    });
  }
}
