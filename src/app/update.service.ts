import { Injectable } from "@angular/core";
import { Todo } from "./interfaces/todo";

@Injectable({ providedIn: "root" })
export class UpdateService {
  allTodosArray: Todo[] = [];
  todoKeys: Set<string> = new Set();

  updateTasksList(): void {
    const keys: string[] = Object.keys(localStorage).filter((key) =>
      /\d{13}/.test(key)
    );
    let arr: Todo[] = [];
    for (let key of keys) {
      arr.push(JSON.parse(localStorage.getItem(key) as string));
    }
    this.allTodosArray = arr.sort((a: any, b: any) => b.id - a.id);
  }

  setTask(id: string, todoElement: Todo): void {
    localStorage.setItem(id, JSON.stringify(todoElement));
  }

  deleteTask(id: string): void {
    localStorage.removeItem(id);
    this.todoKeys.delete(id);
  }

  getTask(id: string): Todo {
    return JSON.parse(localStorage.getItem(id) as string);
  }
}
