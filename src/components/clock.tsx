"use client";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type ClockProps = {
  initial: Date;
  className?: string;
};

const Clock: React.FC<ClockProps> = ({ initial, className }) => {
  const [time, setTime] = useState(initial);

  const tick = () => {
    setTime(new Date());
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <div className={cn("tabular-nums", className)}>
      {time.toLocaleTimeString("es-AR", {
        timeZone: "America/Argentina/Cordoba",
        hour: "numeric",
        day: "numeric",
        month: "long",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>
  );
};

export default Clock;
