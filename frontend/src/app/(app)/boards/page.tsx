import BoardsContainer from "@/components/board/BoardsContainer";
import { BoardData } from "@/types/board.types";
import { getAllBoards } from "@/utils/serverApi";

const Boards = async () => {
  const boards: BoardData[] = (await getAllBoards()).data.data;

  return (
    <div className="space-y-4">
      <h1 className="text-title text-center">Your Boards</h1>
      <BoardsContainer initialBoards={boards} />
    </div>
  );
};

export default Boards;
