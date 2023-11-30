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

export type PrimaryDto = {
    symbol: string;
    expiration: string;
    bidSize: number;
    offerSize: number;
    highestBid: number;
    highestOffer: number;
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
            // Had to make this try/catch because data wasn't always JSON formatted
            try {
                const data = JSON.parse(primaryData) as PrimaryData;
                setBids((prevValues) => {
                    return [...prevValues, data];
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
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

    const speciesArray: PrimaryDto[] = [];
    bids.forEach((bid: PrimaryData) => {
        const symbol: string = bid.instrumentId.symbol;
        const expirationMatch = symbol.match(/(\d+hs|CI)/); // Match for 24hs, 48hs, or C.I
        const expiration: string = expirationMatch ? expirationMatch[0] : "CI";

        // Check BI (Bid) prices
        if (bid.marketData.BI) {
            bid.marketData.BI.forEach((bi: MarketDataItem) => {
                const existingSpecies = speciesArray.find((species) => species.symbol === symbol);

                if (!existingSpecies) {
                    speciesArray.push({
                        symbol,
                        expiration,
                        highestBid: bi.price,
                        highestOffer: 0,
                        bidSize: bi.size || 0,
                        offerSize: 0,
                    });
                } else {
                    existingSpecies.highestBid = Math.max(existingSpecies.highestBid, bi.price);
                    existingSpecies.bidSize = Math.max(existingSpecies.bidSize, bi.size || 0);
                }
            });
        }

        // Check OF (Offer) prices
        if (bid.marketData.OF) {
            bid.marketData.OF.forEach((of: MarketDataItem) => {
                const existingSpecies = speciesArray.find((species) => species.symbol === symbol);

                if (!existingSpecies) {
                    speciesArray.push({
                        symbol,
                        expiration,
                        highestBid: 0,
                        highestOffer: of.price,
                        bidSize: 0,
                        offerSize: of.size || 0,
                    });
                } else {
                    existingSpecies.highestOffer = Math.max(existingSpecies.highestOffer, of.price);
                    existingSpecies.offerSize = Math.max(existingSpecies.offerSize, of.size || 0);
                }
            });
        }
    });

    return { speciesArray }
};
