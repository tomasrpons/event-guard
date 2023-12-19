"use client";
import { useEffect, useState } from "react";

type ClockProps = {
  initial: Date;
};

const Clock: React.FC<ClockProps> = ({ initial }) => {
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
    <div className="tabular-nums">
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
