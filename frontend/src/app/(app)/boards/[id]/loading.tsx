import { logo } from "@/constants";
import Image from "next/image";

const TasksContainerSkeleton = () => {
  return (
    <>
      {/* Board Header */}
      <header className="space-y-1">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="logo shrink-0" width={40} height={40} />
          <h1 className="h-10 basis-1/2 rounded-lg bg-gray-300 animate-pulse"></h1>
        </div>
        <p className="h-6 basis-1/2 rounded-lg bg-gray-300 animate-pulse ml-14"></p>
      </header>
      {/* Task Container Skeleton */}
      <section className="space-y-4">
        {/* Task */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-300 animate-pulse p-4 rounded-2xl flex justify-between items-center"
          >
            <div className="flex gap-4 grow">
              {/* Icon */}
              <div className="bg-white size-10 rounded-lg flex shrink-0 justify-center items-center">
                <div className="bg-gray-300 animate-pulse size-4 rounded"></div>
              </div>
              <div className="flex flex-col justify-center grow">
                <div className="bg-gray-400 animate-pulse rounded-lg h-6 w-2/3"></div>
              </div>
            </div>
            {/* STATUS BADGE */}
            <div className="size-10 bg-gray-400 animate-pulse rounded-lg flex items-center justify-center shrink-0"></div>
          </div>
        ))}
      </section>
    </>
  );
};

export default TasksContainerSkeleton;
