import BoardClient from "@/components/board/BoardClient";
import { getBoard } from "@/utils/serverApi";

const Board = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const board = (await getBoard(id as string)).data;

  return <BoardClient initBoard={board} />;
};

export default Board;
