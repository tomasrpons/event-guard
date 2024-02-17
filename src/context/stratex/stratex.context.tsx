"use client";

import React from "react";
import type { StockDto, FutureDto, BondDto, DollarDto } from "~/hooks/use-primary";

export interface StratexContextInterface {
  stocks: StockDto[];
  futures: FutureDto[];
  bonds: BondDto[];
  isMarketClosed: boolean;
  dollars: DollarDto[];
}

export const StratexContext = React.createContext<StratexContextInterface>({
  isMarketClosed: true,
  stocks: [],
  futures: [],
  bonds: [],
  dollars: [],
});
