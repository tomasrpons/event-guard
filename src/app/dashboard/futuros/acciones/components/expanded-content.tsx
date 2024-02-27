import React from "react";
import { TableRow, TableCell } from "~/components/ui/table";
import { type DollarDto } from "~/hooks/use-stratex";

type ExpandedContentType = {
  dollars?: DollarDto[];
};

const ExpandedContent: React.FC<ExpandedContentType> = ({ dollars }) => {
  return (
    <>
      <TableRow>
        <TableCell>{1}</TableCell>
        <TableCell>{2}</TableCell>
        <TableCell>Holis!!</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{1}</TableCell>
        <TableCell>{2}</TableCell>
        <TableCell>Holis!!</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{1}</TableCell>
        <TableCell>{2}</TableCell>
        <TableCell>Holis!!</TableCell>
      </TableRow>
    </>
  );
};

export default ExpandedContent;
