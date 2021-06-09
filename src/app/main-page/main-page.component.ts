import { Component, OnChanges, OnInit } from '@angular/core';
import { TodoInterface } from '../interfaces/interface-todo';
import { ToolbarTools } from '../interfaces/interface-toolbar-tools';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnChanges {
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

  ngOnChanges() {
    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
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

  changeTodo(event: Event, todo: TodoInterface): void {
    let eventTarget: any = event.target as any;
    let value: string = eventTarget.checked as string;

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

  canEdit(todo: TodoInterface) {
    localStorage.setItem(
      todo.id.toString(),
      JSON.stringify({ ...todo, edit: !todo.edit })
    );

    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
  }

  toEdit(element: HTMLInputElement, todo: TodoInterface) {
    localStorage.setItem(
      todo.id.toString(),
      JSON.stringify({ ...todo, edit: !todo.edit, title: element.value })
    );
    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
  }

  sortBy(value: string) {
    switch (true) {
      case value == 'newest':
        this.allTodos.sort((a: TodoInterface, b: TodoInterface) => b.id - a.id);
        break;

      case value == 'latest':
        this.allTodos.sort((a: TodoInterface, b: TodoInterface) => a.id - b.id);
        break;
    }
  }

  searchTodo(event: Event, parameter: string) {
    this.allTodos = this.updateService.allTodosArray;
    let eTarget = event.target as any;
    let value: string = eTarget.value as string;

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
    console.log('searchInput', this.searchPlaceholder);
  }

  changeTools(value: string) {
    for (let tool in this.tools) {
      tool == value ? (this.tools[value] = true) : (this.tools[tool] = false);
    }
    if (value == 'search') this.searchPlaceholder = 'What needs to be search?';
  }

  placeholderForSearch(searchValue: string) {
    searchValue == 'Name'
      ? (this.searchPlaceholder = 'What needs to be search?')
      : (this.searchPlaceholder = 'Enter the date in the format : YYYY-MM-DD');
  }

  removeCompleted() {
    this.allTodos
      .filter((todo) => todo.done === true)
      .map((todo) => localStorage.removeItem(todo.id.toString()));
    this.updateService.updateTasksList();
    this.allTodos = this.updateService.allTodosArray;
  }
}
