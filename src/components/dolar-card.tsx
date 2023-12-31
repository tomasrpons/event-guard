"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import React from "react";
import { cn } from "~/lib/utils";
type DolarCardProps = {
  title: string;
  variation?: number;
  buyPrice?: number;
  sellPrice?: number;
};

const DolarCard: React.FC<DolarCardProps> = ({
  title,
  variation,
  buyPrice,
  sellPrice,
}) => {
  return (
    <div className="w-64 rounded border-2 border-black p-2">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold text-blue-600">{title}</h2>
        <div className="flex items-center gap-2 text-xl font-bold text-green-600">
          <ArrowUpIcon className="h-6 w-6 text-green-600" />
          {variation}%
        </div>
      </div>
      <div className={"flex items-end justify-between"}>
        <div className="flex gap-4">
          {buyPrice ? (
            <div className="flex flex-col">
              <p className="font-semibold">{buyPrice}</p>
              <p>Compra</p>
            </div>
          ) : null}
          <div className="flex flex-col">
            <p className="font-semibold">{sellPrice}</p>
            <p>Venta</p>
          </div>
        </div>
        <p className="text-xs">06/12/2023 - 16:03</p>
      </div>
    </div>
  );
};

export default DolarCard;
