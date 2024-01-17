"use client"

import React from "react";
import type { StockDto, FutureDto, BondDto, DollarDto } from "~/hooks/use-primary";

export interface StratexContextInterface {
  stocks: StockDto[];
  futures: FutureDto[];
  bonds: BondDto[];
  dollars: DollarDto[];
}

export const StratexContext = React.createContext<StratexContextInterface>({
  stocks: [],
  futures: [],
  bonds: [],
  dollars: [],
});
