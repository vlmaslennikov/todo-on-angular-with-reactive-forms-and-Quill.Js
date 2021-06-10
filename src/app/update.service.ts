import { Injectable } from '@angular/core';
import { TodoInterface } from './interfaces/interface-todo';

@Injectable()
export class UpdateService {
  allTodosArray: TodoInterface[] = [];
  currentTodo!:string;

  updateTasksList(action:string,id?:number,section?:TodoInterface ):void{

    switch (action) {

      case 'GET_All':

        const keys: string[] = Object.keys(localStorage);
        let arr: any = [];
        for (let key of keys) {
          arr.push(JSON.parse(localStorage.getItem(key) as string));
        }
        arr = [...new Set(arr)];
        this.allTodosArray = arr.sort((a: any, b: any) => b.id - a.id);
        
        break;

      case "GET":
        
       this.currentTodo = localStorage.getItem(id?.toString() as string) as string
        
        break;
    
      case 'SET':

        localStorage.setItem(
          id?.toString() as string,
          JSON.stringify(section)
        )
        
        break;

      case 'REMOVE':
        localStorage.removeItem(id?.toString() as string)
        break;


    }

    
  }
}
