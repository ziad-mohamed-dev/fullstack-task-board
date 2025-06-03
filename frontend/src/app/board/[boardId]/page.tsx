"use client";
import BoardHeader from "@/components/board/BoardHeader";
import TasksContainer from "@/components/tasks/TasksContainer";
import { mockBoard } from "@/db/mockBoard";
import { useBoardStore } from "@/stores/useBoardStore";

const BoardTasks = () => {
  const { tasks } = useBoardStore();
  return (
    <main className="max-w-2xl mx-auto py-8 px-6 space-y-12">
      <BoardHeader name={mockBoard.name} description={mockBoard.description} />
      <TasksContainer tasks={tasks} />
    </main>
  );
};

export default BoardTasks;
