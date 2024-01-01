import { useEffect, useState } from "react";

export type TickerDto = {
    ticker: string;
    bidVolume: number;
    lastPrice: number;
    variation?: number;
};

export type MarketType = "Future" | "Spot";

export type TickerValues = {
    key: "bidVolume" | "lastPrice";
    value: number;
};
export type VariableType = "l1" | "l2";
export type VariableName = "Ticker" | "FutureRates";

export type EventGuardTickerDto = {
    ticker: string;
    market: MarketType;
    variableType: VariableType;
    variableName: VariableName;
    values: TickerValues[];
};

export const usePrimary = () => {
    const [futures, setFutures] = useState<Record<string, TickerDto>>({});
    const [spot, setSpot] = useState<Record<string, TickerDto>>({});

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3500");

        socket.addEventListener("open", (event) => {
            console.log("WebSocket connection opened:", event);
        });

        socket.addEventListener("message", (event) => {
            const primaryData = event.data as string;

            try {
                const data = JSON.parse(primaryData) as EventGuardTickerDto;

                // Extracting relevant data from the received message
                const { ticker, market, values } = data;
                // Updating the state based on market type
                if (market === "Future") {
                    setFutures((prev) => ({
                        ...prev,
                        [ticker]: {
                            ...prev[ticker],
                            ticker,
                            bidVolume: values.find((v) => v.key === "bidVolume")?.value ?? 0,
                            lastPrice: values.find((v) => v.key === "lastPrice")?.value ?? 0,
                            // Add other properties as needed
                        },
                    }));
                } else if (market === "Spot") {
                    setSpot((prev) => ({
                        ...prev,
                        [ticker]: {
                            ...prev[ticker],
                            ticker,
                            bidVolume: values.find((v) => v.key === "bidVolume")?.value ?? 0,
                            lastPrice: values.find((v) => v.key === "lastPrice")?.value ?? 0,
                            // Add other properties as needed
                        },
                    }));
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
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

    useEffect(() => {
        console.log("futures", futures);
        console.log("spot", spot);
    }, [spot, futures]);

    return { spot: Object.values(spot), futures: Object.values(futures) };
};
