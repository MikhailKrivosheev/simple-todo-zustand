export interface TodoItem {
  isCompleted: boolean;
  text: string;
}

export interface TodoProps {
  todo: TodoItem;
  removeTodo: (todo: TodoItem) => void;
  index: number;
}
