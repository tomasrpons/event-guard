"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import React from "react";
type DolarCardProps = {
  title?: string;
  variation?: number;
  buyPrice?: number;
  sellPrice?: number;
  operationDate?: Date;
};

const DollarCard: React.FC<DolarCardProps> = ({ title, variation, buyPrice, sellPrice, operationDate }) => {
  return (
    <div className="w-64 rounded border-2 border-slate-400 p-2 shadow-md">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold text-blue-600">{title}</h2>
        {variation ? (
          <div className="flex items-center gap-2 text-xl font-bold text-green-600">
            <ArrowUpIcon className="h-6 w-6 text-green-600" />
            {variation}%
          </div>
        ) : null}
      </div>
      <div className={"flex items-end justify-between"}>
        <div className="flex gap-4">
          {buyPrice ? (
            <div className="flex flex-col">
              <p className="font-semibold">${buyPrice}</p>
              <p>Compra</p>
            </div>
          ) : null}
          <div className="flex flex-col">
            <p className="font-semibold">${sellPrice}</p>
          </div>
        </div>
        <p className="text-xs">
          {operationDate
            ? new Date(operationDate).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : new Date().toString()}
        </p>
      </div>
    </div>
  );
};

export default DollarCard;
