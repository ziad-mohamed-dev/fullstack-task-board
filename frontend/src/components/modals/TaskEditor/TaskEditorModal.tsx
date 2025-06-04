"use client";

import { Task, TaskStatus } from "@/types/board.types";
import IconInput from "./IconInput";
import StatusInput from "./StatusInput";
import Image from "next/image";
import { done, trash } from "@/constants";
import { useModalStore } from "@/stores/useModalStore";
import { ChangeEvent, FormEvent, useState } from "react";
import { useBoardStore } from "@/stores/useBoardStore";
import Input from "@/components/ui/Input";

const TaskEditorModal = () => {
  const { data, closeModal } = useModalStore();
  const { deleteTask, updateTask } = useBoardStore();
  const [TaskData, setTaskData] = useState<Task>(
    (data as Task) || {
      id: "",
      name: "",
      description: "",
      icon: "👨‍💻",
      status: "To Do",
    }
  );

  const icons: Task["icon"][] = ["👨‍💻", "💬", "☕", "🏋️‍♀️", "📚", "⏰"];
  const status: Exclude<TaskStatus, "To Do">[] = [
    "In Progress",
    "Completed",
    "Won't Do",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { icon, name, status } = TaskData;
    const isVaild = icon.trim() && name.trim() && status.trim();
    if (isVaild) {
      updateTask(TaskData);
      closeModal();
    }
  };

  const handleDelete = () => {
    deleteTask(TaskData.id);
    closeModal();
  };

  return (
    <form
      className="space-y-4 flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
      {/* Inputs */}
      <div className="space-y-5">
        {/* Task Name Input */}
        <Input
          label="Task name"
          placeholder="Enter task name"
          value={TaskData.name}
          name="name"
          onChange={handleChange}
          errorMsg={!TaskData.name.trim() ? "task name is required" : ""}
        />
        {/* Task Description Input */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="task-description"
            className="text-label-size text-label"
          >
            Description
          </label>
          <textarea
            id="task-description"
            className="input resize-none h-40"
            placeholder="Enter a short description"
            value={TaskData.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        {/* Task Icon Input */}
        <div className="flex flex-col gap-1">
          <span className="text-label text-label-size">Icon</span>
          <div className="flex flex-wrap gap-4">
            {icons.map((icon, i) => (
              <IconInput
                isSelected={icon === TaskData.icon}
                key={i}
                icon={icon}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
        {/* Task Status Input */}
        <div className="flex flex-col gap-1">
          <span className="text-label text-label-size">Status</span>
          <div className="grid grid-cols-2 gap-4">
            {status.map((status, i) => (
              <StatusInput
                key={i}
                status={status}
                isSelected={status === TaskData.status}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Form Buttons */}
      <div className="flex justify-end gap-6 py-2">
        <button
          type="button"
          className="btn bg-btn-delete"
          onClick={handleDelete}
        >
          <span>Delete</span>
          <Image src={trash} width={20} height={20} alt="trash" />
        </button>
        <button type="submit" className="btn bg-btn-save">
          <Image src={done} width={20} height={20} alt="trash" />
          <span>Save</span>
        </button>
      </div>
    </form>
  );
};

export default TaskEditorModal;
