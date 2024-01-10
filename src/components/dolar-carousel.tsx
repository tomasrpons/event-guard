"use client";
import React from "react";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import DolarCard from "~/components/dolar-card";

type DolarCarouselProps = {
  filterValue?: string;
};

const DolarCarousel: React.FC<DolarCarouselProps> = ({ filterValue }) => {
  const dolarCards = [
    {
      title: "Dólar Oficial",
      variation: 4.95,
      buyPrice: 827.75,
      sellPrice: 787.75,
    },
    { title: "Dólar Blue", variation: 1.32, buyPrice: 995.0, sellPrice: 945.0 },
    { title: "Dólar CCL", variation: 2.26, sellPrice: 903.16 },
    { title: "Dólar MEP", variation: 0.42, sellPrice: 927.75 },
  ];

  // Filter DolarCards based on the filterValue
  const filteredDolarCards = filterValue
    ? dolarCards.filter((card) =>
        card.title.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : dolarCards;
  return (
    <ScrollArea className="w-full whitespace-nowrap ">
      <div className="flex w-full justify-center space-x-12 p-4">
        {filteredDolarCards.map((dolarCard) => (
          <DolarCard
            key={dolarCard.title}
            title={dolarCard.title}
            variation={dolarCard.variation}
            buyPrice={dolarCard.buyPrice}
            sellPrice={dolarCard.sellPrice}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DolarCarousel;
