import { Task } from "@/types/board.types";
import TaskCard from "./TaskCard";
import AddTaskBtn from "./AddTaskBtn";

interface TasksContainerProps {
  tasks: Task[];
}

const TasksContainer = ({ tasks }: TasksContainerProps) => {
  return (
    <section className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <AddTaskBtn />
    </section>
  );
};

export default TasksContainer;
