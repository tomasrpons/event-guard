"use client";

import React from "react";
import { StratexContext } from "./stratex.context";
import { useStratex } from "~/hooks/use-stratex";
interface StratexProviderProps {
  children: React.ReactNode;
}

const StratexProvider: React.FC<StratexProviderProps> = (props) => {
  const { futures, stocks, bonds, dollars } = useStratex();
  const isMarketClosed = () => {
    const currentDateTime = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Cordoba" });
    const currentDay = new Date(currentDateTime).getDay();
    const currentHour = new Date(currentDateTime).getHours();

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
