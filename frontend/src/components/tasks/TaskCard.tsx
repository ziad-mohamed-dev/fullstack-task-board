"use client";
import { close_ring, done_round, time_atack } from "@/constants";
import { useModalStore } from "@/stores/useModalStore";
import { TaskData } from "@/types/board.types";
import Image from "next/image";

interface TaskCardProps {
  task: TaskData;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { openModal, data } = useModalStore();

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
      onClick={() => openModal({ type: "task", data: task })}
      className={`${
        task.status === "Completed"
          ? "bg-card-completed"
          : task.status === "In Progress"
          ? "bg-card-progress"
          : task.status === "Won't Do"
          ? "bg-card-wontdo"
          : "bg-card-todo"
      } ${
        data?._id === task._id &&
        "scale-105 ring-2 ring-input-focus ring-offset-3"
      } p-4 rounded-2xl text-start w-full flex justify-between items-center cursor-pointer hover:scale-105 transition-transform duration-300`}
    >
      {/* TASK DETAILS */}
      <div className="flex gap-4">
        <div className="bg-white size-10 rounded-lg flex shrink-0 justify-center items-center">
          {task.icon}
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold text-task-title break-all">
            {task.name}
          </h2>
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
