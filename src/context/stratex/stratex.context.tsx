"use client"

import React from "react";
import type { StockDto, FutureDto, BondDto } from "~/hooks/use-primary";

export interface StratexContextInterface {
  stocks: StockDto[];
  futures: FutureDto[];
  bonds: BondDto[];
}

export const StratexContext = React.createContext<StratexContextInterface>({
  stocks: [],
  futures: [],
  bonds: [],
});
