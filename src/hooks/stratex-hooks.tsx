import { useContext } from "react";
import type { StratexContextInterface } from "~/context/stratex/stratex.context";
import { StratexContext } from "~/context/stratex/stratex.context";
export const useStratexContext = (): StratexContextInterface =>
  useContext(StratexContext);
