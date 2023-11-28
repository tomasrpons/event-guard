import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { motion } from "framer-motion";
import type { PrimaryDto } from "~/hooks/use-primary";

type BidTableProps = {
  data: PrimaryDto[];
  type: "futures" | "spot";
};

const BidTable: React.FC<BidTableProps> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h2>{props.type === "futures" ? "Futuros" : "Acciones"}</h2>
      <div className="flex items-center py-4"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Especie</TableHead>
            <TableHead>Offer Price</TableHead>
            <TableHead>Bid Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data
            .filter((val) =>
              props.type === "futures"
                ? val.symbol.includes("/")
                : !val.symbol.includes("/"),
            )
            .map((bid, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{bid.symbol}</TableCell>
                <TableCell>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {bid.highestOffer}
                  </motion.div>
                </TableCell>
                <TableCell>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {bid.highestBid}
                  </motion.div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BidTable;
