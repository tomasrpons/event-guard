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
    highestBid: number;
    bidSize: number;
    offerSize: number;
    highestOffer: number;
} & PrimaryData

export const usePrimary = () => {
    const [marketData, setMarketData] = useState<Record<string, PrimaryDto>>({});

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3500");

        socket.addEventListener("open", (event) => {
            console.log("WebSocket connection opened:", event);
        });

        socket.addEventListener("message", (event) => {
            const primaryData = event.data as string;

            try {
                const data = JSON.parse(primaryData) as PrimaryData;
                if (data?.instrumentId) {
                    setMarketData((prevData) => {
                        const symbol = data.instrumentId.symbol;
                        const updatedData: PrimaryDto = {
                            ...data,
                            highestBid: data.marketData?.BI?.[0]?.price ?? 0,
                            bidSize: data.marketData.BI?.[0]?.size ?? 0,
                            offerSize: data.marketData.OF?.[0]?.size ?? 0,
                            highestOffer: data.marketData.OF?.[0]?.price ?? 0,
                            symbol: data.instrumentId.symbol
                        };

                        return {
                            ...prevData,
                            [symbol]: updatedData,
                        };
                    });
                }
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

    const futures: PrimaryDto[] = [];
    const spot: PrimaryDto[] = [];

    // Separating market data into "futures" and "spot"
    Object.values(marketData).forEach((data) => {
        const symbol = data.instrumentId.symbol;

        if (symbol.includes("48hs") || symbol.includes("24hs") || symbol.includes("CI")) {
            futures.push(data);
        } else {
            spot.push(data);
        }
    });

    return { spot, futures };
};