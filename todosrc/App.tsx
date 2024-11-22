import { useState } from "react";
import AddList from "./AddList";
import TodoList from "./TodoList";
import "./App.css";
import ShowCount from "./ShowCount";

interface Task {
  taskName: string;
  id: number;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTodo = (taskName: string) => {
    const newTask = {
      taskName,
      id: new Date().getTime(),
      done: false,
    };
    setTasks([...tasks, newTask]);
  };

  const taskFinish = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const taskDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const taskRestart = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: false } : task)));
  };

  return (
    <>
      <AddList addTodo={addTodo} />
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <>
          <ShowCount task={tasks} />
          <TodoList task={tasks} taskdone={taskFinish} taskDelete={taskDelete} taskrestart={taskRestart} />
        </>
      )}
    </>
  );
}

export default App;
