import { Component, OnInit } from '@angular/core';
import { TodoInterface } from '../interfaces/interface-todo';
import { ToolbarTools } from '../interfaces/interface-toolbar-tools';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  title!: string;
  allTodos: TodoInterface[] = [];
  searchPlaceholder?: string;
  allCompletedTodos!: boolean;
  tools: ToolbarTools | any = {
    add: true,
    search: false,
    sort: false,
  };

  details: boolean = false;
  constructor(private updateService: UpdateService) {}

  ngOnInit() {
    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
    this.allCompletedTodos =
      this.allTodos.filter((todo) => todo.done === true).length > 0;
  }

  addTodo(): void {
    const newTodo: TodoInterface = {
      title: this.title,
      details: 'some text',
      date: new Date(),
      id: Date.now(),
      done: false,
      edit: false,
    };
    const datenow = String(Date.now());
    localStorage.setItem(datenow, JSON.stringify(newTodo));

    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
    this.title = '';
  }

  changeTodo(value: boolean, todo: TodoInterface): void {
    localStorage.setItem(
      todo.id.toString(),
      JSON.stringify({ ...todo, done: value })
    );
    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
    this.allCompletedTodos =
      this.allTodos.filter((todo) => todo.done === true).length > 0;
  }

  deleteTodo(todo: TodoInterface): void {
    localStorage.removeItem(todo.id.toString());
    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
  }

  canEdit(todo: TodoInterface): void {
    localStorage.setItem(
      todo.id.toString(),
      JSON.stringify({ ...todo, edit: !todo.edit })
    );

    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
  }

  toEdit(element: HTMLInputElement, todo: TodoInterface): void {
    localStorage.setItem(
      todo.id.toString(),
      JSON.stringify({ ...todo, edit: !todo.edit, title: element.value })
    );
    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
  }

  sortBy(value: string): void{
    switch (true) {
      case value == 'newest':
        this.allTodos.sort((a: TodoInterface, b: TodoInterface) => b.id - a.id);
        break;

      case value == 'latest':
        this.allTodos.sort((a: TodoInterface, b: TodoInterface) => a.id - b.id);
        break;
    }
  }

  searchTodo(value:string, parameter: string): void{
    this.allTodos = this.updateService.allTodosArray;
    switch (true) {
      case parameter === 'Name':
        {
          this.allTodos = this.allTodos.filter((a: TodoInterface) =>
            a.title.includes(value)
          );
        }
        break;

      case parameter === 'Date':
        {
          this.allTodos = this.allTodos.filter((a: any) =>
            a.date.toString().slice(0, 10).includes(value)
          );
        }
        break;
    }
  }

  changeTools(value: string): void {
    for (let tool in this.tools) {
      tool == value ? (this.tools[value] = true) : (this.tools[tool] = false);
    }
    if (value == 'search') this.searchPlaceholder = 'What needs to be search?';
  }

  placeholderForSearch(searchValue: string): void {
    searchValue == 'Name'
      ? (this.searchPlaceholder = 'What needs to be search?')
      : (this.searchPlaceholder = 'Enter the date in the format : YYYY-MM-DD');
  }

  removeCompleted(): void{
    this.allTodos
      .filter((todo) => todo.done === true)
      .map((todo) => localStorage.removeItem(todo.id.toString()));
    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
  }
}
