import "./index.css";
import { useEffect, useState } from "react";
import ToDoItem from "./components/TodoItem";
import FilterButton from "./components/FilterButton";

const initialData = [
  { id: 1, title: "Lorem ipsum dolor sit amet", completed: false },
  { id: 2, title: "Vivamus id arcu laoreet", completed: false },
  { id: 3, title: "Donec cursus mi", completed: true },
  { id: 4, title: "Aenean id fringilla justo", completed: false }
];

const ToDo = () => {
  const [addTodo, setAddTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(initialData);
  const [doneCount, setDoneCount] = useState(0);

  const handleStatus = (item) => {
    // marcar como completada o no una tarea
    setTodos(todos.map((todo) => {
      return todo.id === item.id ? { ...todo, completed: !item.completed } : { ...todo };
    }));

  }

  const handleRemove = (item) => {
    // eliminar una tarea
    setTodos([...todos].filter(todo => todo.id !== item.id))
  };

  const handleAddTodo = (addTodo) => {
    // agregar una tarea
    const newTodo = {
      id: todos.length + 1,
      title: addTodo,
      completed: false
    }
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setAddTodo("");

  };

  const filterTodos = () => {
    // filtrar tareas por completadas, no completadas, todas.
    if (filter === "complete") {
      return [...todos].filter(todo => todo.completed === true);

    } else if (filter === "incomplete") {
      return [...todos].filter(todo => todo.completed === false);

    } else {
      return todos;
    }

  };

  const handleChange = (e) => {
    setAddTodo(e.target.value);

  };

  const visibleTodos = filterTodos();

  useEffect(() => {
    setDoneCount([...todos].filter(todo => todo.completed === true).length);
  }, [todos])

  return (
    <div>
      <div className="field">
        <input value={addTodo} onChange={handleChange}  />
        <button
          className="btn btn--add"
          onClick={() => { handleAddTodo(addTodo) }}
          disabled={addTodo.length < 1}
        >
          Add
        </button>
      </div>
      <div className="filter-wrapper">
        <div className="filter-tabs">
          <FilterButton
            activeFilter={filter}
            filter="all"
            onClick={() => setFilter("all")}
          />
          <FilterButton
            activeFilter={filter}
            filter="complete"
            onClick={() => setFilter("complete")}
          />
          <FilterButton
            activeFilter={filter}
            filter="incomplete"
            onClick={() => setFilter("incomplete")}
          />
        </div>
        <p style={{ lineHeight: 1.5 }}>
          {doneCount === todos.length
            ? `🎉 ${doneCount}/${todos.length} all todos complete!`
            : `${doneCount}/${todos.length} todos complete`}
        </p>
      </div>
      {visibleTodos.length === 0 && (
        <p style={{ paddingLeft: "1rem" }}>No todos to show here...</p>
      )}
      {visibleTodos.length > 0 &&
        visibleTodos.map((item, idx) => {
          return (
            <ToDoItem
              key={item.id}
              item={item}
              handleStatus={() => handleStatus(item)}
              handleRemove={() => handleRemove(item)}
            />
          );
        })}
    </div>
  );
};

export default function App() {
  return (
    <div className="container">
      <h1>
        <strong>ToDo</strong> List
      </h1>
      <ToDo />
    </div>
  );
}
