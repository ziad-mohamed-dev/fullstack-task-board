"use client";
import BoardHeader from "@/components/board/BoardHeader";
import TasksContainer from "@/components/tasks/TasksContainer";
import { useBoardStore } from "@/stores/useBoardStore";

const BoardTasks = () => {
  const { tasks, board } = useBoardStore();
  return (
    <main className="max-w-2xl mx-auto py-8 px-6 space-y-12">
      <BoardHeader board={board} />
      <TasksContainer tasks={tasks} />
    </main>
  );
};

export default BoardTasks;
