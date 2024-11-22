interface TaskProp {
  taskName: string;
  id: number;
  done: boolean;
}

interface taskType {
  task: TaskProp[];
}

const ShowCount = ({ task }: taskType) => {
  const totalTask = task.length;
  const totalTaskDone = task.filter((task) => task.done).length;
  const totalRemaining = totalTask - totalTaskDone;
  return (
    <div className="taskCount">
      <span>Total Tasks: {totalTask}</span>
      <span>Total Completed: {totalTaskDone}</span>
      <span>Total Remaining: {totalRemaining}</span>
    </div>
  );
};

export default ShowCount;
