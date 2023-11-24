import { useEffect, useState } from "react";

type MarketDataItem = {
    price: number;
    size: number;
}

type Instrument = {
    marketId: string;
    symbol: string;
};

export type PrimaryData = {
    type: string;
    timestamp: number;
    instrumentId: Instrument;
    marketData: {
        CL: {
            price: number;
            size: number;
            date: number;
        };
        BI?: MarketDataItem[];
        LA: {
            price: number;
            size: number;
            date: string;
        };
        OF?: MarketDataItem[];
    };
};

export const usePrimary = () => {
    const [bids, setBids] = useState<PrimaryData[]>([]);
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3500");

        socket.addEventListener("open", (event) => {
            console.log("WebSocket connection opened:", event);
        });

        socket.addEventListener("message", (event) => {
            const primaryData = event.data as string;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const data: PrimaryData = JSON.parse(primaryData);
            setBids((prevValues) => {
                return [...prevValues, data];
            });
        });

        socket.addEventListener("error", (event) => {
            console.error("WebSocket error:", event);
        });

        socket.addEventListener("close", (event) => {
            console.log("WebSocket connection closed:", event);
        });

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        const futures = bids.filter((val) => !val.instrumentId.symbol.includes("/"))
        console.log('futures', futures);
    }, [bids])

    const speciesArray: { symbol: string; highestBid: number; highestOffer: number }[] = [];

    bids.forEach((item: PrimaryData) => {
        const symbol: string = item.instrumentId.symbol;

        // Check BI (Bid) prices
        if (item.marketData.BI) {
            item.marketData.BI.forEach((bi: MarketDataItem) => {
                const existingSpecies = speciesArray.find(species => species.symbol === symbol);

                if (!existingSpecies) {
                    speciesArray.push({ symbol, highestBid: bi.price, highestOffer: 0 });
                } else {
                    existingSpecies.highestBid = Math.max(existingSpecies.highestBid, bi.price);
                }
            });
        }

        // Check OF (Offer) prices
        if (item.marketData.OF) {
            item.marketData.OF.forEach((of: MarketDataItem) => {
                const existingSpecies = speciesArray.find(species => species.symbol === symbol);

                if (!existingSpecies) {
                    speciesArray.push({ symbol, highestBid: 0, highestOffer: of.price });
                } else {
                    existingSpecies.highestOffer = Math.max(existingSpecies.highestOffer, of.price);
                }
            });
        }
    });

    return { speciesArray }
};
