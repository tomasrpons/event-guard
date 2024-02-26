"use client";
import React from "react";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import DollarCard from "~/components/dollar-card";
import { useStratexContext } from "~/hooks/stratex-hooks";
import { castDollarName } from "../lib/utils";

type DolarCarouselProps = {
  filterValue?: string;
};

const toolTipTexts = {
  dolarMayorista: "Dólar A3500 publicado por el BCRA",
  dolarCCl:
    " El Índice CCL-MtR es un indicador financiero que refleja las paridades implícitas que surgen de la compra-venta de instrumentos de renta fija y renta variable en pesos vs. dólares con liquidación de dólares por transferencia entre cuentas radicadas en el exterior.",
  rofex20:
    "El Índice de Acciones ROFEX 20 es un índice de retorno total, diseñado para medir el desempeño de una cartera integrada por las 20 acciones más líquidas en el mercado accionario local ponderadas por su capitalización bursátil.",
} as const;

const DollarCarousel: React.FC<DolarCarouselProps> = ({ filterValue }) => {
  const { dollars } = useStratexContext();
  // Filter DolarCards based on the filterValue
  const filteredDolarCards = filterValue
    ? dollars.filter((card) => card.ticker?.toLowerCase().includes(filterValue.toLowerCase()))
    : dollars;
  return (
    <ScrollArea className="w-full whitespace-nowrap ">
      <div className="flex w-full justify-center space-x-12 p-4">
        {filteredDolarCards.map((dolarCard) => (
          <DollarCard
            key={dolarCard.ticker}
            operationDate={dolarCard.operationDate}
            title={castDollarName(dolarCard.ticker ?? "")}
            toolTipText={
              dolarCard.ticker?.includes("CCL")
                ? toolTipTexts.dolarCCl
                : dolarCard.ticker?.includes("RFX")
                  ? toolTipTexts.rofex20
                  : toolTipTexts.dolarMayorista
            }
            buyPrice={dolarCard.bidPrice}
            sellPrice={dolarCard.offerPrice}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DollarCarousel;
