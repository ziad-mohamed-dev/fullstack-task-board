import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import { done } from "@/constants";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { BoardData } from "@/types/board.types";
import { createBoard, updateBoard } from "@/utils/clientApi";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { ChangeEvent } from "react";

interface FormData {
  name: string;
  description: string;
}

const BoardEditorModal = () => {
  const { data, closeModal, type } = useModalStore();
  const [BoardData, setBoardData] = useState<BoardData>(
    (data as BoardData) || { id: "", name: "", description: "" }
  );
  const [BoardErrors, setBoardErrors] = useState({ name: "", description: "" });
  const [isSubmited, setIsSubmited] = useState(false);
  const [isCreateingBoard, setIsCreateingBoard] = useState(false);
  const { addBoard, editBoard } = useBoardStore();

  // RealTime validation after the first submit
  useEffect(() => {
    if (isSubmited) {
      const { name, description } = BoardData;
      validateForm({ name, description });
    }
  }, [isSubmited, BoardData]);

  const validateForm = ({ name, description }: FormData) => {
    const newErrors = { name: "", description: "" };
    let isVaild = true;

    if (!name.trim()) {
      newErrors.name = "board name is required";
      isVaild = false;
    }

    if (!description.trim()) {
      newErrors.description = "board name is required";
      isVaild = false;
    }

    setBoardErrors(newErrors);
    return isVaild;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBoardData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmited(true);
    const { name, description } = BoardData;
    if (validateForm({ name, description })) {
      // Creating new board
      if (type === "create board") {
        try {
          setIsCreateingBoard(true);
          const newBoard = (await createBoard({ name, description })).data;
          addBoard(newBoard);
        } catch (err) {
          console.log(err);
        }
      }
      // Edit board
      else if (type === "edit board") {
        try {
          const updatedBoard = (await updateBoard(BoardData)).data;
          editBoard(updatedBoard);
        } catch (err) {
          console.log(err);
        }
      }
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
          errorMsg={BoardErrors.name}
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
          {BoardErrors.description && (
            <p className="text-sm text-text-error absolute -bottom-4.5">
              {BoardErrors.description}
            </p>
          )}
        </div>
      </div>
      {/* Form Buttons */}
      <div className="flex justify-end py-2">
        <button type="submit" className="btn bg-btn-save">
          {isCreateingBoard ? (
            <Loader />
          ) : (
            <Image src={done} width={20} height={20} alt="trash" />
          )}
          <span>
            {type === "edit board"
              ? "Save"
              : type === "create board" && "Create"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default BoardEditorModal;
