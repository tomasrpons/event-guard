"use client"

import React from "react";
import type { StockDto, FutureDto } from "~/hooks/use-primary";

export interface StratexContextInterface {
  stocks: StockDto[];
  futures: FutureDto[];
}

export const StratexContext = React.createContext<StratexContextInterface>({
  stocks: [],
  futures: [],
});
