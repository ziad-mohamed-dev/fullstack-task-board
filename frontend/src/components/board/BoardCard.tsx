"use client";
import { useBoardStore } from "@/stores/useBoardStore";
import { BoardData } from "@/types/board.types";
import { DeleteBoard } from "@/utils/clientApi";
import Link from "next/link";
import Loader from "../ui/Loader";
import { useState } from "react";

interface BoardCardProps {
  board: BoardData;
}

const BoardCard = ({ board }: BoardCardProps) => {
  const { deleteBoard } = useBoardStore();
  const [isDeleteing, setIsDeleting] = useState(false);

  const handleDeleteBoard = async () => {
    try {
      setIsDeleting(true);
      await DeleteBoard(board._id);
      deleteBoard(board._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      key={board._id}
      className="p-4 space-y-2 bg-btn-add rounded-2xl text-start w-full justify-between items-center cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <h2 className="text-board-title font-semibold">{board.name}</h2>
      <p className="text-description font-light">{board.description}</p>
      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href={`/boards/${board._id}`}
          className="text-center hover:brightness-90 transition duration-300 rounded-lg p-2 bg-btn-primary text-white"
        >
          Open
        </Link>
        <button
          onClick={handleDeleteBoard}
          className="cursor-pointer hover:brightness-90 transition duration-300 rounded-lg p-2 bg-btn-delete text-white flex items-center justify-center gap-2"
        >
          {isDeleteing ? <Loader /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
