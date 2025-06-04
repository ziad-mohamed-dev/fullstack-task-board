import Input from "@/components/ui/Input";
import { done } from "@/constants";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { Board } from "@/types/board.types";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { ChangeEvent } from "react";

const BoardEditorModal = () => {
  const { data, closeModal } = useModalStore();
  const { updateBoard } = useBoardStore();
  const [BoardData, setBoardData] = useState<Board>(
    (data as Board) || { id: "", name: "", description: "" }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBoardData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, description } = BoardData;
    const isVaild = description.trim() && name.trim();
    if (isVaild) {
      updateBoard(BoardData);
      closeModal();
    }
  };

  return (
    <form
      className="h-full flex flex-col justify-between"
      onSubmit={handleSubmit}
    >
      {/* Inputs */}
      <div className="space-y-5">
        {/* Board Name Input */}
        <Input
          label="Task name"
          placeholder="Enter task name"
          value={BoardData.name}
          name="name"
          onChange={handleChange}
          errorMsg={!BoardData.name.trim() ? "board name is required" : ""}
        />
        {/* Board Description Input */}
        <div className="flex flex-col gap-1 relative">
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
            value={BoardData.description}
            name="description"
            onChange={handleChange}
          />
          {!BoardData.description.trim() && (
            <p className="text-sm text-text-error absolute -bottom-4.5">
              description is required
            </p>
          )}
        </div>
      </div>
      {/* Form Buttons */}
      <div className="flex justify-end py-2">
        <button type="submit" className="btn bg-btn-save">
          <Image src={done} width={20} height={20} alt="trash" />
          <span>Save</span>
        </button>
      </div>
    </form>
  );
};

export default BoardEditorModal;
