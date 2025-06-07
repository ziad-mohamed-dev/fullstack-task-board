"use client";
import { BoardData } from "@/types/board.types";
import TasksContainer from "../tasks/TasksContainer";
import BoardHeader from "./BoardHeader";
import { useBoardStore } from "@/stores/useBoardStore";
import { useEffect } from "react";
import { useParams } from "next/navigation";

interface BoardClientProps {
  initBoard: BoardData;
}

const BoardClient = ({ initBoard }: BoardClientProps) => {
  const { setBoard, board } = useBoardStore();
  const { id } = useParams();

  useEffect(() => {
    setBoard(initBoard);
  }, [initBoard, setBoard]);

  if (board._id !== id) return null;

  return (
    <>
      <BoardHeader board={board} />
      <TasksContainer tasks={board.tasks} />
    </>
  );
};

export default BoardClient;
