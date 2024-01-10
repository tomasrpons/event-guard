"use client"

import React from "react";
import { StratexContext } from "./stratex.context";
import { usePrimary } from "~/hooks/use-primary";

interface StratexProviderProps {
  children: React.ReactNode;
}

const StratexProvider: React.FC<StratexProviderProps> = (props) => {
  const { futures, stocks } = usePrimary();
  return (
    <StratexContext.Provider value={{ futures, stocks }}>
      {props.children}
    </StratexContext.Provider>
  );
};

export default StratexProvider;
