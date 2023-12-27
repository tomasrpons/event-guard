"use client";
import React from "react";
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
        <p className="text-xl font-bold text-green-600">{variation}</p>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <p className="font-semibold">{buyPrice}</p>
            <p>Compra</p>
          </div>
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
