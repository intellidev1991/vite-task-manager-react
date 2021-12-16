import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { PRIORITY } from "../../core";

interface IPrioritySelectorProps {
  className?: string;
  onChange?: ((e: PRIORITY) => void) | undefined;
  value: PRIORITY;
}

interface ICircleIndicatorProps {
  className?: string;
  active?: boolean;
  priority: PRIORITY;
  onClick: () => void;
  showLabel: "before" | "after" | "none";
}

const CircleIndicator: React.FC<ICircleIndicatorProps> = React.memo(
  ({ className, active, priority, onClick, showLabel = "none" }) => {
    const priority_color = priority === "Low" ? "bg-green-300" : priority === "Medium" ? "bg-yellow-400" : "bg-red-500";
    return (
      <div className="flex flex-col md:flex-row justify-start items-center hover:cursor-pointer" onClick={onClick}>
        {showLabel === "before" && (
          <>
            <Typography variant="h5">{priority.toString()}</Typography>
            <div className="w-4" />
          </>
        )}
        <div
          className={`w-10 h-10 rounded-full shadow-sm hover:opacity-80 border border-black ${
            active ? priority_color : "bg-gray-300"
          } ${className}`}
        ></div>
        {showLabel === "after" && (
          <>
            <div className="w-4" />
            <Typography variant="h5">{priority.toString()}</Typography>
          </>
        )}
      </div>
    );
  },
);

const PrioritySelector: React.FC<IPrioritySelectorProps> = React.memo(({ className, value, onChange }) => {
  const [selected, setSelected] = useState<PRIORITY>(value);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

  const _onLowHandler = () => setSelected("Low");
  const _onMediumHandler = () => setSelected("Medium");
  const _onHighHandler = () => setSelected("High");
  return (
    <div className={`w-full flex flex-row justify-between items-center ${className}`}>
      <CircleIndicator showLabel="after" active={selected === "Low"} priority="Low" onClick={_onLowHandler} />
      <CircleIndicator showLabel="after" active={selected === "Medium"} priority="Medium" onClick={_onMediumHandler} />
      <CircleIndicator showLabel="after" active={selected === "High"} priority="High" onClick={_onHighHandler} />
    </div>
  );
});

export { PrioritySelector, CircleIndicator };
