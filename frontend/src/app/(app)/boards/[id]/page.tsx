import BoardClient from "@/components/board/BoardClient";

const Board = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // const board = (await getBoard(id as string)).data;

  return (
    <BoardClient
      initBoard={{
        _id: id,
        name: "Getting Started",
        description: "Your first board",
        tasks: [
          {
            _id: "1",
            icon: "⏰",
            board: id,
            name: "Task in Progress",
            status: "In Progress",
          },
          {
            _id: "2",
            icon: "🏋️‍♀️",
            board: id,
            name: "Task Completed",
            status: "Completed",
          },
          {
            _id: "3",
            icon: "☕",
            board: id,
            name: "Task Won’t Do",
            status: "Won't Do",
          },
          {
            _id: "4",
            icon: "📚",
            board: id,
            name: "Task To Do",
            description:
              "Work on a Challenge on devChallenges.io, learn TypeScript.",
            status: "To Do",
          },
        ],
      }}
    />
  );
};

export default Board;



// Task To Do
