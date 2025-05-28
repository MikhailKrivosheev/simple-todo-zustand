import cn from "classnames";
import React, { useRef, useState } from "react";
import useTodoStore from "../store/useTodoStore";
import type { TodoItem, TodoProps } from "./types";

const Todo = ({ todo, removeTodo, index }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editTodo = useTodoStore((state) => state.editTodo);

  const todoClasses = cn("todo__item", {
    "todo__item--checked": todo.isCompleted,
  });

  const onEditTodoClick = (todo: TodoItem, index: number) => {
    editTodo({ text: todo.text, isCompleted: todo.isCompleted }, index);
    setIsEditing(false);
  };

  const onCheckTodoClick = (todo: TodoItem, index: number) => {
    editTodo({ text: todo.text, isCompleted: !todo.isCompleted }, index);
  };

  return (
    <li className={todoClasses}>
      <span className="todo__item-index">{index + 1}.</span>
      <div className="todo__item-content">
        {isEditing ? (
          <>
            <input
              type="text"
              defaultValue={todo.text}
              value={inputRef.current?.value}
              ref={inputRef}
            />
            <button
              onClick={() =>
                onEditTodoClick(
                  {
                    text: inputRef.current?.value || "",
                    isCompleted: todo.isCompleted,
                  },
                  index
                )
              }
            >
              ✓
            </button>
          </>
        ) : (
          <>
            <span>{todo.text}</span>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onCheckTodoClick(todo, index)}
            />
          </>
        )}
        {!isEditing && (
          <div className="todo__item-buttons">
            <button
              className="todo__item-remove"
              onClick={() => removeTodo(todo)}
            >
              Remove todo
            </button>
            <button
              className="todo__item-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit todo
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default React.memo(Todo);
