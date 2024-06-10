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

  @Output() dataEmitter: EventEmitter<TodoItemDTO> = new EventEmitter<TodoItemDTO>(); //dataEmitter this is a confusing naming , it should nam like some event name , if this is a button click it should be submitButtonEvent somthing like that

  //Comment : here you can apply smart and dumb component concept in angular (clean code practices) , move this injection to the parent
  // let your current form component only focus on UI task, no business logic and service injection
  constructor(private todoListService : TodoListService) {
    return;
  }

  // on here your submit should fire an event which you did correct "this.dataEmitter.emit(response)"
  // Then your this.todoListService.addTodoList() function should move to the parent component
  // your form component should only care about form, ui and button click, if button is click notify the parent to do some logic, the child component should be dumb component
  onSubmit() {
    this.todoListService.addTodoList(this.todoTitle, this.todoDescription).subscribe(response => {
      this.dataEmitter.emit(response)
    });
    this.todoTitle = '';
    this.todoDescription = '';
  }
}
