import { useRef } from "react";
import useTodoStore from "../store/useTodoStore";
import Filter from "./Filter";
import Todo from "./Todo";
import Button from "./UI/Button";

const TodoList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = useTodoStore((state) => state.addTodo);
  const todos = useTodoStore((state) => state.todos);
  const clearTodos = useTodoStore((state) => state.clearTodos);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const filter = useTodoStore((state) => state.filter);

  const onAddTodoClick = () => {
    addTodo({ text: inputRef.current?.value || "", isCompleted: false });
    inputRef.current!.value = "";
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter.value === "active") {
      return todo.isCompleted === true;
    } else if (filter.value === "completed") {
      return todo.isCompleted === false;
    } else {
      return true;
    }
  });

  return (
    <section className="flex-column h-full w-full">
      <h1 className="mb-4 text-3xl font-bold text-red-500">
        Todo List
      </h1>
      <div className="mb-10 flex flex-col gap-2">
        <input
          type="input"
          placeholder="add-todo"
          ref={inputRef}
          className="rounded border-2 border-gray-300 px-3 py-2"
        />
        <Button onClick={onAddTodoClick}>Add todo</Button>
        <Button onClick={() => clearTodos()} variant="danger">
          Clear todos list
        </Button>
        <Filter />
      </div>

      <ul className="flex-column gap-2 rounded-md border-1 border-gray-300 p-5">
        {filteredTodos.length < 1 ? (
          <span>Нет ни одной задачи</span>
        ) : (
          filteredTodos.map((todo, index) => (
            <Todo
              todo={todo}
              removeTodo={removeTodo}
              index={index}
              key={index}
            />
          ))
        )}
      </ul>
    </section>
  );
};

export default TodoList;
