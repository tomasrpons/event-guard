import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { PrimaryData } from "./websocket";

type BidTableProps = {
  data: PrimaryData[];
  type: "futures" | "spot";
};

const BidTable: React.FC<BidTableProps> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h2>{props.type === "futures" ? "Futuros" : "Acciones"}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Especie</TableHead>
            <TableHead>Closing Price</TableHead>
            <TableHead>Last Price</TableHead>
            <TableHead>Bid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data
            .filter((val) =>
              props.type === "futures"
                ? val.instrumentId.symbol.includes("/")
                : !val.instrumentId.symbol.includes("/"),
            )
            .map((bid, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {bid.instrumentId.symbol}
                </TableCell>
                <TableCell>{bid.marketData.CL?.price}</TableCell>
                <TableCell>{bid.marketData.LA?.price}</TableCell>
                <TableCell className="text-right">
                  {bid.marketData.BI[0]?.price}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BidTable;
