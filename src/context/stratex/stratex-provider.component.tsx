"use client";

import React from "react";
import { StratexContext } from "./stratex.context";
import { usePrimary } from "~/hooks/use-primary";
interface StratexProviderProps {
  children: React.ReactNode;
}

const StratexProvider: React.FC<StratexProviderProps> = (props) => {
  const { futures, stocks, bonds, dollars } = usePrimary();
  const isMarketClosed = () => {
    const currentDateTime = new Date(
      new Date().toLocaleString("es-AR", {
        timeZone: "America/Argentina/Cordoba",
      })
    );
    const currentDay = new Date(currentDateTime).getDay();
    const currentHour = new Date(currentDateTime).getHours();
    console.log("currentDay", currentDay);
    console.log("currentHour", currentHour);
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 11 && currentHour < 17) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <StratexContext.Provider value={{ futures, stocks, bonds, dollars, isMarketClosed: isMarketClosed() }}>
      {props.children}
    </StratexContext.Provider>
  );
};

export default StratexProvider;
