"use client";
import { close_ring, done_round, time_atack } from "@/constants";
import { useModalStore } from "@/stores/useModalStore";
import { Task } from "@/types/board.types";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { openModal } = useModalStore();

  const statusIcon =
    task.status === "Completed"
      ? done_round
      : task.status === "In Progress"
      ? time_atack
      : task.status === "Won't Do"
      ? close_ring
      : "";

  return (
    <button
      onClick={() => openModal("task", task)}
      className={`${
        task.status === "Completed"
          ? "bg-card-completed"
          : task.status === "In Progress"
          ? "bg-card-progress"
          : task.status === "Won't Do"
          ? "bg-card-wontdo"
          : "bg-card-todo"
      } p-4 rounded-2xl text-start w-full flex justify-between items-center cursor-pointer hover:scale-105 transition duration-300`}
    >
      {/* TASK DETAILS */}
      <div className="flex gap-4">
        <div className="bg-white size-10 rounded-lg flex shrink-0 justify-center items-center">
          {task.icon}
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold text-task-title">{task.name}</h2>
          {task.description && (
            <p className="w-3/4 font-light">{task.description}</p>
          )}
        </div>
      </div>
      {/* STATUS BADGE */}
      {task.status !== "To Do" && (
        <div
          className={`${
            task.status === "Completed"
              ? "bg-badge-completed"
              : task.status === "In Progress"
              ? "bg-badge-progress"
              : task.status === "Won't Do"
              ? "bg-badge-wontdo"
              : ""
          } size-10 rounded-lg flex items-center justify-center shrink-0`}
        >
          <Image src={statusIcon} alt="Time atack" width={20} height={20} />
        </div>
      )}
    </button>
  );
};

export default TaskCard;
