import { close_ring, done, done_round, time_atack } from "@/constants";
import { TaskStatus } from "@/types/board.types";
import Image from "next/image";
import { ChangeEvent } from "react";

interface StatusInputProps {
  status: Exclude<TaskStatus, "To Do">;
  isSelected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const StatusInput = ({ status, isSelected, onChange }: StatusInputProps) => {
  const statusIcon =
    status === "Completed"
      ? done_round
      : status === "In Progress"
      ? time_atack
      : status === "Won't Do"
      ? close_ring
      : "";

  return (
    <div>
      <label
        htmlFor={`status-${status}`}
        className="border-2 border-border cursor-pointer rounded-lg p-0.5 has-checked:border-input-focus flex justify-between items-center gap-2"
      >
        <input
          type="radio"
          id={`status-${status}`}
          className="peer"
          hidden
          name="status"
          onChange={onChange}
          checked={isSelected}
          value={status}
        />
        <div className="flex items-center gap-2">
          {/* STATUS BADGE */}
          <div
            className={`${
              status === "Completed"
                ? "bg-badge-completed"
                : status === "In Progress"
                ? "bg-badge-progress"
                : status === "Won't Do"
                ? "bg-badge-wontdo"
                : ""
            } size-10 rounded-lg flex items-center justify-center shrink-0`}
          >
            <Image src={statusIcon} alt="Time atack" width={20} height={20} />
          </div>
          <p className="break-all line-clamp-1">{status}</p>
        </div>
        <div className="bg-input-focus rounded-full p-0.25 mr-2 peer-checked:block hidden shrink-0">
          <Image src={done} width={15} height={15} alt="selected" />
        </div>
      </label>
    </div>
  );
};

export default StatusInput;
