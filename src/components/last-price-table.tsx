import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

const LastPriceTable = (input: { bidPrice: string; bidSize: string; offerPrice: string; offerSize: string }) => {
  const { bidPrice, bidSize, offerPrice, offerSize } = input;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Compra</TableHead>
          <TableHead>Volumen de compra</TableHead>
          <TableHead>Venta</TableHead>
          <TableHead className="text-right">Volumen de venta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">$ {bidPrice}</TableCell>
          <TableCell>{bidSize}</TableCell>
          <TableCell>$ {offerPrice}</TableCell>
          <TableCell className="text-right">{offerSize}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default LastPriceTable;
