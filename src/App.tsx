import { useRef } from "react";
import "./App.css";
import Todo from "./components/Todo";
import useTodoStore from "./store/useTodoStore";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = useTodoStore((state) => state.addTodo);
  const todos = useTodoStore((state) => state.todos);
  const clearTodos = useTodoStore((state) => state.clearTodos);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const onAddTodoClick = () => {
    addTodo({text: inputRef.current?.value || "", isChecked: false});
    inputRef.current!.value = "";
  };

  return (
    <main>
      <section className="todo">
        <h1>Todo List</h1>
        <div className="todo__control">
          <input type="input" placeholder="add-todo" ref={inputRef} />
          <button onClick={onAddTodoClick}>Add todo</button>
          <button onClick={() => clearTodos()}>Clear todos list</button>
        </div>

        <ul className="todo__list">
          {todos.length < 1 ? (
            <span>Нет ни одной задачи</span>
          ) : (
            todos.map((todo, index) => (
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
    </main>
  );
}

export default App;
