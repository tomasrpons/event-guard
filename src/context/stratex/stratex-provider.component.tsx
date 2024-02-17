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
    const currentDateTime = new Date().toLocaleString("es-AR");
    const currentTime = new Date(currentDateTime);
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 11 && currentHour < 17) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <StratexContext.Provider value={{ futures, stocks, bonds, dollars, isMarketClosed: isMarketClosed() }}>
      {props.children}
    </StratexContext.Provider>
  );
};

export default StratexProvider;
