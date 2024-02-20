"use client";

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type ClockProps = {
  className?: string;
};

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
};

const hourOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
};

const Clock: React.FC<ClockProps> = ({ className }) => {
  const [hour, setHour] = useState<Date>(new Date());

  const hourFormat = new Intl.DateTimeFormat("es-ES", hourOptions);
  const dateFormat = new Intl.DateTimeFormat("es-ES", dateOptions);

  const hora = hourFormat.format(hour);
  const fecha = dateFormat.format(new Date());

  const getHora = (date: Date) => {
    const ONE_SECOND = 1000;
    useEffect(() => {
      const time = setTimeout(() => {
        setHour(date);
      }, ONE_SECOND);
      return () => {
        clearTimeout(time);
      };
    }, [hour]);
    return hora;
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={cn("tabular-nums", className)}>
      {capitalizeFirstLetter(fecha)} {getHora(new Date())}
    </div>
  );
};

export default Clock;
