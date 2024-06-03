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
  todoTitle: string = ''; //i dont think this variable is used, you can remove
  constructor(private todoListService : TodoListService) {
    return;
  }

  ngOnInit():void {
    this.todoListService.getTodoList().subscribe( //this code here seens to be similar to refreshTodo() you can just call the function here
      (todoItem : TodoItemIDDTO[]) => {
        this.todoItems = todoItem;
      })
  }

  refreshTodo(): void {// great that you trying to reuse function, but there are some more advance method to do so we trying to avoid nested subscription in better angular code but for begineer it is fine
    this.todoListService.getTodoList().subscribe(
      (todoItem : TodoItemIDDTO[]) => {
        this.todoItems = todoItem;
      });
  }

  receiveData() {// This method is not used?
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
