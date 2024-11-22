interface Task {
  taskName: string;
  id: number;
  done: boolean;
}

interface TodoListProps {
  task: Task[];
  taskdone: (id: number) => void;
  taskDelete: (id: number) => void;
  taskrestart: (id: number) => void;
}
const TodoList: React.FC<TodoListProps> = ({ task, taskdone, taskDelete, taskrestart }) => {
  return (
    <ul className="taskList">
      {task.map((data) => (
        <li key={data.id} className={data.done ? "taskDone" : ""}>
          <p style={data.done ? { textDecoration: "line-through" } : {}}>{data.taskName}</p>
          <div className="taskAction">
            {data.done == false ? (
              <button className="doneBtn" onClick={() => taskdone(data.id)}>
                Done
              </button>
            ) : (
              <button className="doneBtn" onClick={() => taskrestart(data.id)}>
                Restart
              </button>
            )}
            <button className="deleteBtn" onClick={() => taskDelete(data.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
