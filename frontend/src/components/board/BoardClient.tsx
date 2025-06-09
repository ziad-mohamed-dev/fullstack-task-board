"use client";
import { BoardData } from "@/types/board.types";
import TasksContainer from "../tasks/TasksContainer";
import BoardHeader from "./BoardHeader";
import { useBoardStore } from "@/stores/useBoardStore";
import { useEffect } from "react";

interface BoardClientProps {
  initBoard: BoardData;
}

const BoardClient = ({ initBoard }: BoardClientProps) => {
  const { setBoard, board } = useBoardStore();

  console.log(board);
  useEffect(() => {
    setBoard(initBoard);
    return () => {
      setBoard({ _id: "", description: "", name: "", tasks: [] });
    };
  }, [initBoard, setBoard]);

  return (
    <>
      <BoardHeader board={board} />
      <TasksContainer tasks={board.tasks} />
    </>
  );
};

export default BoardClient;
