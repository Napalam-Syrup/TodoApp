export interface TodoItemDTO { //if this is a new todo to be add to database i will name something "newTodoItemDTO"
    title: string;
    isDone: boolean;
    description: string;
}

//Example
export interface NewTodoItemDTO {
  title: string;
  isDone: boolean;
  description: string;
}
