import { Injectable } from '@angular/core';

@Injectable()
export class UpdateService {
  allTodosArray: any = [];

  updateTasksList() {
    const keys: string[] = Object.keys(localStorage);
    let arr: any = [];
    for (let key of keys) {
      arr.push(JSON.parse(localStorage.getItem(key) as string));
    }
    arr = [...new Set(arr)];

    this.allTodosArray = arr.sort((a: any, b: any) => b.id - a.id);
  }
}
