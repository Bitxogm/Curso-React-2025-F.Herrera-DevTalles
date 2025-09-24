import { ZodAny } from './../../../node_modules/zod/src/v3/types';
import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface taskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: 'ADD_TODO', payload: string }
  | { type: 'TOGGLE_TODO', payload: number }
  | { type: 'DELETE_TODO', payload: number };

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean()
});

const taskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number()
})

export const getTasksInitialState = (): taskState => {
  const localStorageState = localStorage.getItem('tasks-state');

  if (!localStorageState) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0
    };
  }
  // VAlidar mediante ZodA
  const result = taskStateSchema.safeParse(JSON.parse(localStorageState));
  if (result.error) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0
    };
  }
  // ! Cuidado con el objeto si ha sido manipulñado
  return result.data;
}
export const taskReducer = (state: taskState, action: TaskAction): taskState => {

  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false
      }
      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        completed: state.completed + 1,
        pending: state.pending + 1
      };
    };


    case 'DELETE_TODO':
      {
        const currentTodos = state.todos.filter((todo) => todo.id !== action.payload)
        return {
          ...state,
          todos: currentTodos,
          length: currentTodos.length,
          completed: currentTodos.filter((todo) => todo.completed).length,
          pending: currentTodos.filter((todo) => !todo.completed).length

        }
      }

    case 'TOGGLE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
            length: state.todos.length + 1,
            pending: state.pending + 1
          }
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length
      }
    }

    default:
      return state;

  };
};