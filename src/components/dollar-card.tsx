"use client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
type DolarCardProps = {
  title?: string;
  buyPrice?: number;
  sellPrice?: number;
  toolTipText?: string;
  operationDate?: Date;
};

const DollarCard: React.FC<DolarCardProps> = ({ title, toolTipText, buyPrice, sellPrice, operationDate }) => {
  return (
    <div className="w-64 rounded border-2 border-slate-400 p-2 shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-600">{title}</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoCircledIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent className="max-w-lg">
            <p className="text-wrap">{toolTipText}</p>
          </TooltipContent>
        </Tooltip>
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
            <p className="font-semibold">${sellPrice?.toLocaleString("es-ES")}</p>
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
