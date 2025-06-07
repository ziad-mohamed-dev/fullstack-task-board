"use client";
import { edit, logo } from "@/constants";
import { useModalStore } from "@/stores/useModalStore";
import { BoardData } from "@/types/board.types";
import Image from "next/image";

interface BoardHeaderProps {
  board: BoardData;
}

const BoardHeader = ({ board }: BoardHeaderProps) => {
  const { openModal } = useModalStore();

  return (
    <header className="space-y-1">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="logo shrink-0" width={40} height={40} />
        <h1 className="text-title text-nowrap overflow-hidden text-ellipsis">
          {board.name}
        </h1>
        <button
          onClick={() => openModal({ type: "edit board", data: board })}
          className="cursor-pointer hover:opacity-80 hover:scale-115 transition duration-200 shrink-0"
        >
          <Image src={edit} alt="Edit duotone" width={25} height={25} />
        </button>
      </div>
      <p className="text-description ml-14">{board.description}</p>
    </header>
  );
};

export default BoardHeader;
