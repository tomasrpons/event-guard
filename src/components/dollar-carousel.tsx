"use client";
import React from "react";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import  DollarCard from "~/components/dollar-card";
import { useStratexContext } from "~/hooks/stratex-hooks";

type DolarCarouselProps = {
  filterValue?: string;
};

const DollarCarousel: React.FC<DolarCarouselProps> = ({ filterValue }) => {
  const { dollars } = useStratexContext();
  // Filter DolarCards based on the filterValue
  const filteredDolarCards = filterValue
    ? dollars.filter((card) =>
        card.ticker?.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : dollars;
  return (
    <ScrollArea className="w-full whitespace-nowrap ">
      <div className="flex w-full justify-center space-x-12 p-4">
        {filteredDolarCards.map((dolarCard) => (
          <DollarCard
            key={dolarCard.ticker}
            operationDate={dolarCard.operationDate}
            title={dolarCard.ticker}
            variation={dolarCard.variation}
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
