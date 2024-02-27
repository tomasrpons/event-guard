import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import LastPriceTable from "./last-price-table";

const LastPriceTableTooltip = (input: {
  bidPrice: number;
  bidSize: number;
  offerPrice: number;
  offerSize: number;
  lastPrice: number;
}) => {
  const { bidPrice, bidSize, offerPrice, offerSize, lastPrice } = input;
  return (
    <Tooltip>
      <div className="flex gap-1 items-center">
        <span className="mr-1">$</span>
        <span className="truncate font-medium">{lastPrice.toLocaleString("es-ES")}</span>
        <TooltipTrigger>
          <InfoCircledIcon />
        </TooltipTrigger>
      </div>
      <TooltipContent>
        <LastPriceTable
          bidPrice={bidPrice?.toLocaleString("es-ES") ?? "0"}
          bidSize={bidSize?.toLocaleString("es-ES") ?? "0"}
          offerPrice={offerPrice?.toLocaleString("es-ES") ?? "0"}
          offerSize={offerSize?.toLocaleString("es-ES") ?? "0"}
        />
      </TooltipContent>
    </Tooltip>
  );
};

export default LastPriceTableTooltip;
