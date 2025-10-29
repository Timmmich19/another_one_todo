import type { Status } from "../types";
import { TrashIcon } from "../assets/trash";
import type React from "react";

export interface TaskProps {
  title: string;
  description: string;
  status: Status;
}

export const Task: React.FC<TaskProps> = ({ title, description, status }) => {
  return (
    <div className="bg-[#2e3030] rounded py-2 px-4 w-full flex flex-row gap-4 items-center">
      <div className="flex flex-col size-full min-w-0">
        <div className="size-full">
          <Progress status={status} />
          <h2 className="text-nowrap text-lg" title={title}>
            {title}
          </h2>
        </div>
        <p className="text-nowrap text-base truncate">{description}</p>
      </div>
      <button
        className="ml-auto hover:bg-[#424242] rounded-2xl size-8 flex items-center justify-center cursor-pointer"
        title="delete"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

interface ProgressProps {
  status: Status;
}

const Progress: React.FC<ProgressProps> = ({ status }) => {
  return <div></div>;
};
