import cn from "classnames";
import React, { useRef, useState } from "react";
import useTodoStore from "../store/useTodoStore";
import type { TodoItem, TodoProps } from "./types";
import Button from "./UI/Button";

const Todo = ({ todo, removeTodo, index }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editTodo = useTodoStore((state) => state.editTodo);

  const todoClasses = cn(
    "relative flex-row p-6 pt-10 border-b-1 border-gray-300",
    {
      "bg-lime-200": todo.isCompleted,
    },
  );

  const onEditTodoClick = (todo: TodoItem, index: number) => {
    editTodo({ text: todo.text, isCompleted: todo.isCompleted }, index);
    setIsEditing(false);
  };

  const onCheckTodoClick = (todo: TodoItem, index: number) => {
    editTodo({ text: todo.text, isCompleted: !todo.isCompleted }, index);
  };

  return (
    <li className={todoClasses}>
      <span>{index + 1}.</span>
      <div className="flex-row gap-3">
        {isEditing ? (
          <>
            <input
              type="text"
              className="rounded-md border-2 border-black px-3 py-2"
              defaultValue={todo.text}
              value={inputRef.current?.value}
              ref={inputRef}
            />
            <Button
              onClick={() =>
                onEditTodoClick(
                  {
                    text: inputRef.current?.value || "",
                    isCompleted: todo.isCompleted,
                  },
                  index,
                )
              }
            >
              ✓
            </Button>
          </>
        ) : (
          <>
            <span>{todo.text}</span>
            <Button
              onClick={() => onCheckTodoClick(todo, index)}
              variant="absolute"
            />
          </>
        )}
        {!isEditing && (
          <div className="absolute top-1 right-1 flex h-8 gap-2">
            <Button onClick={() => setIsEditing(true)} size="sm">
              Edit todo
            </Button>
            <Button onClick={() => removeTodo(todo)} variant="danger" size="sm">
              Remove todo
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default React.memo(Todo);
