export interface TodoItem {
  isChecked: boolean;
  text: string;
}

export interface TodoProps {
  todo: TodoItem;
  removeTodo: (todo: TodoItem) => void;
  index: number;
}
