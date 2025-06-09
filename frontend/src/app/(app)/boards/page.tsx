import BoardsContainer from "@/components/board/BoardsContainer";
import BoardsContainerSkeleton from "@/components/board/BoardsContainerSkeleton";
import { Suspense } from "react";

const Boards = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-title text-center">Your Boards</h1>
      <Suspense fallback={<BoardsContainerSkeleton />}>
        <BoardsContainer />
      </Suspense>
    </div>
  );
};

export default Boards;
