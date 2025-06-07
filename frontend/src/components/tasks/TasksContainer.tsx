import { TaskData } from "@/types/board.types";
import TaskCard from "./TaskCard";
import AddTaskBtn from "./AddTaskBtn";

interface TasksContainerProps {
  tasks: TaskData[];
}

const TasksContainer = ({ tasks }: TasksContainerProps) => {
  return (
    <section className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
      <AddTaskBtn />
    </section>
  );
};

export default TasksContainer;
