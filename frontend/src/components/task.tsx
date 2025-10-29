import { useState, type MouseEvent } from "react";

import type { Status } from "../types";
import { TrashIcon } from "../assets/trash";

export interface TaskProps {
  title: string;
  description: string;
  status: Status;
}

export const Task: React.FC<TaskProps> = ({ title, description, status }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="bg-[#2e3030] rounded py-2 px-4 w-full flex flex-row gap-4 items-center"
      onClick={() => {
        handleClick();
      }}
    >
      <Progress status={status} />
      <div className="flex flex-col size-full min-w-0 justify-between">
        <h2 className="text-nowrap text-lg" title={title}>
          {title}
        </h2>
        <p className={`text-base ${!isOpen && "text-nowrap truncate"}`}>{description}</p>
      </div>
      <button
        className="ml-auto hover:bg-[#424242] rounded-2xl size-8 flex items-center justify-center cursor-pointer"
        title="delete"
      >
        <TrashIcon onClick={(e) => e.stopPropagation()} />
      </button>
    </div>
  );
};

interface ProgressProps {
  status: Status;
}

const Progress: React.FC<ProgressProps> = ({ status }) => {
  const [currentStatus, setCurrentStatus] = useState<Status>(status);
  const handleClick = (newStatus: Status, e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setCurrentStatus(newStatus);
    e.stopPropagation();
  };
  const buttons = [
    { status: "pending", color: "bg-blue-900" },
    { status: "in-progress", color: "bg-amber-300" },
    { status: "done", color: "bg-green-500" },
  ];
  return (
    <div className="flex flex-col gap-1">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`rounded-full size-4 ${
            button.status === currentStatus ? button.color : "bg-gray-500 hover:border hover:cursor-pointer"
          }`}
          onClick={(e) => handleClick(button.status as Status, e)}
        />
      ))}
    </div>
  );
};
