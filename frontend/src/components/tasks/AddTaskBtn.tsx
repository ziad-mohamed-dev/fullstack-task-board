"use client";
import { add_round } from "@/constants";
import { useBoardStore } from "@/stores/useBoardStore";
import { createTask } from "@/utils/clientApi";
import Image from "next/image";

const AddTaskBtn = () => {
  const { addTask, board } = useBoardStore();

  const handleAddTask = async () => {
    try {
      const newTodo = (await createTask(board._id)).data;
      addTask(newTodo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleAddTask}
      className="p-4 rounded-2xl text-start w-full bg-btn-add hover:brightness-95 transition duration-300 flex items-center gap-4 cursor-pointer"
    >
      {/* ADD BADGE */}
      <div className="size-10 bg-badge-addtask rounded-lg flex items-center justify-center shrink-0">
        <Image src={add_round} alt="add round" width={20} height={20} />
      </div>
      <h2 className="font-semibold">Add new task</h2>
    </button>
  );
};

export default AddTaskBtn;
