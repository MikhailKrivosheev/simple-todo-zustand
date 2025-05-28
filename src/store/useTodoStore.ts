import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoItem {
  isChecked: boolean;
  text: string;
}

interface TodoList {
  todos: TodoItem[];
  filter: "all" | "active" | "completed";
  addTodo: (todo: TodoItem) => void;
  editTodo: (todo: TodoItem, index: number) => void;
  removeTodo: (todo: TodoItem) => void;
  clearTodos: () => void;
}

const useTodoStore = create<TodoList>()(
  persist(
    (set) => ({
      todos: [] as TodoItem[],
      filter: "all",

      addTodo: (todo: TodoItem) => {
        set((state) => ({ todos: [...state.todos, todo] }));
      },

      editTodo: (todo: TodoItem, index: number) => {
        set((state) => ({
          todos: [
            ...state.todos.slice(0, index),
            todo,
            ...state.todos.slice(index + 1),
          ],
        }));
      },

      removeTodo: (todo: TodoItem) => {
        set((state) => ({ todos: state.todos.filter((t) => t !== todo) }));
      },

      clearTodos: () => {
        set({ todos: [] });
      },
    }),
    { name: "todoStore" }
  )
);

export const AppStore = () => useTodoStore.getState();

export default useTodoStore;
