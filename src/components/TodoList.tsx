import { useRef } from "react";
import useTodoStore from "../store/useTodoStore";
import Filter from "./Filter";
import Todo from "./Todo";

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
    <section className="todo">
      <h1>Todo List</h1>
      <div className="todo__control">
        <input type="input" placeholder="add-todo" ref={inputRef} />
        <button onClick={onAddTodoClick}>Add todo</button>
        <button onClick={() => clearTodos()}>Clear todos list</button>
        <Filter />
      </div>

      <ul className="todo__list">
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
