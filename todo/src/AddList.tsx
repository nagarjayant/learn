import React, { useState } from "react";

interface AddListProps {
  addTodo: (taskName: string) => void;
}

const AddList: React.FC<AddListProps> = ({ addTodo }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTodo(taskName);
      setTaskName("");
    }
  };

  return (
    <div className="add-list">
      <form onSubmit={handleSubmit}>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Add a new task" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddList;
