const BoardsContainerSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-36 bg-gray-300 rounded-2xl animate-pulse"
          ></div>
        ))}
      </div>
    </>
  );
};

export default BoardsContainerSkeleton;
