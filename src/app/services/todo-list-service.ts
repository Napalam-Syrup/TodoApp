import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewTodoItemDTO, TodoItemDTO } from "../model/todo-item-dto";
import { PORT } from "./config";
import { TodoItemIDDTO } from "../model/todo-item-id-dto";

/**
 * This line is used to tell Angular that
 * the following is a service that can be injected
 * into another part of the application.
 */
@Injectable({
    /**
     * providedIn tells Angular the scope of this service.
     * In this case, it is root, meaning that the service
     * is provided at the root level of the application
     * and therefore only one instance is created.
    */
    providedIn: 'root'
})
export class TodoListService {
    private baseUrl = `http://localhost:${PORT}/`

    constructor(private httpClient: HttpClient) {
        return;
    }

    getTodoList(): Observable<TodoItemIDDTO[]> {
        return this.httpClient.get<TodoItemIDDTO[]>(`${this.baseUrl}api/Todo`);
    }

    addTodoList(title: string, description: string): Observable<TodoItemDTO> {
        const todo: TodoItemDTO = {title, description, isDone: false} //Comment : dont do any logic/mapping they are can be done in component layer, service is for http request and state management, see the example method below
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<TodoItemDTO>(`${this.baseUrl}api/Todo`, todo, { headers });
    }

    //Example
    addTodoListV2(todoitem: NewTodoItemDTO): Observable<TodoItemDTO> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post<TodoItemDTO>(`${this.baseUrl}api/Todo`, todoitem, { headers });
  }

    deleteTodoItem(item: TodoItemIDDTO) {
        const id = item.id;// you dont need extra variable here you can just use item.id below, variable here is abit redundant
        return this.httpClient.delete<String>(`${this.baseUrl}api/Todo/?id=${id}`);
    }

    changeCompleted(item: TodoItemIDDTO) {
        const requestBody = item; //do you neeed this?
        requestBody.isDone = !requestBody.isDone; // do this in component layer, and it should be done in form , not manually set the value 😅
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.put<String>(`${this.baseUrl}api/Todo`, {requestBody}, {headers} )
    }
}
