"use client";
import { useBoardStore } from "@/stores/useBoardStore";
import AddBoardBtn from "./AddBoardBtn";
import BoardCard from "./BoardCard";
import { useEffect, useState } from "react";
import { getAllBoards } from "@/utils/clientApi";

const BoardsContainer = () => {
  const { setBoards, boards } = useBoardStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fetchAllBoards = async () => {
      const boards = (await getAllBoards()).data.data;
      setBoards(boards);
      setHydrated(true);
    };
    fetchAllBoards();
  }, [setBoards]);

  if (!hydrated) return null;

  return (
    <>
      {boards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {boards.map((board) => (
            <BoardCard key={board._id} board={board} />
          ))}
        </div>
      ) : (
        <div className="text-description text-center">Your board is empty</div>
      )}
      <AddBoardBtn />
    </>
  );
};

export default BoardsContainer;
