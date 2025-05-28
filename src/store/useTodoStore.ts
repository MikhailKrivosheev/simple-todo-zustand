import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoItem {
  isCompleted: boolean;
  text: string;
}

interface Filter {
  label: string;
  value: "active" | "completed" | "all";
}

interface TodoList {
  todos: TodoItem[];
  filter: Filter;
  addTodo: (todo: TodoItem) => void;
  editTodo: (todo: TodoItem, index: number) => void;
  removeTodo: (todo: TodoItem) => void;
  clearTodos: () => void;
  addFilter: (filter: Filter) => void;
}

const useTodoStore = create<TodoList>()(
  persist(
    (set) => ({
      todos: [] as TodoItem[],
      filter: { label: "Все", value: "all" },

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

      addFilter: (filter: Filter) => {
        set({ filter: { label: filter.label, value: filter.value } });
      },
    }),
    { name: "todoStore" }
  )
);

export const AppStore = () => useTodoStore.getState();

export default useTodoStore;
