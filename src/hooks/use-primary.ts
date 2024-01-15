"use client"
import { io } from "socket.io-client";

import { useEffect, useState } from "react";

export type TickerDto = {
    ticker?: string;
    tradeVolume?: number;
    lastPrice?: number;
    variation?: number;
};

export type FutureDto = {
    impliedInterestRate?: number;
    nominalInterestRate?: number;
    effectiveInterestRate?: number;
} & TickerDto

export type StockDto = {
    dollarMEP?: number;
} & TickerDto;

type L1Keys = "ticker" | "tickerType" | "operationDate" | "marketId" | "lastPrice" | "lastSize" | "bidPrice" | "bidSize" | "offerPrice" | "offerSize" | "openingPrice" | "closingPrice" | "tradeVolume"
type L2Keys = "Price_change" | "Implied_interest_rate" | "Nominal_interest_rate" | "Effective_interest_rate" | "Dollar_mep";
type ValueKeys = L2Keys | L1Keys


export type TickerValues = {
    key: ValueKeys;
    value: string | number | Date;
};
export type VariableType = "FUTURE" | "STOCK" | "L2" | "BOND";
export type VariableName = "Ticker" | "FUTURE-RATES" | "DOLLAR-MEP" | "CEDEAR-EXCHANGE-RATE" | "DOLLAR-CCL" | "PRICE-CHANGE";
type TickerType = "STOCK" | "BOND" | "FUTURE" | "CEDEAR";
export type EventGuardTickerDto = {
    ticker: string;
    variableType: VariableType;
    variableName: VariableName;
    tickerType: TickerType;
    values: TickerValues[];
};

export const usePrimary = () => {
    const [futures, setFutures] = useState<Record<string, FutureDto>>({});
    const [stocks, setStocks] = useState<Record<string, StockDto>>({});
    const [socket, setSocket] = useState<unknown>()

    useEffect(() => {
        // const socket = new WebSocket("ws://localhost:3500");
        const socket = io("wss://ec2-54-174-10-108.compute-1.amazonaws.com:3500");
        setSocket(socket);

        socket.on("message", (event) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const primaryData = event.data as string;

            try {
                const data = JSON.parse(primaryData) as EventGuardTickerDto;

                // Extracting relevant data from the received message
                const { ticker, values, variableType, variableName, tickerType } = data;
                if (variableType !== 'L2') {
                    const tradeVolume = values.find((val) => val.key === 'tradeVolume');
                    const lastPrice = values.find((val) => val.key === 'lastPrice');
                    switch (variableType) {
                        case "FUTURE":
                            setFutures((prev) => ({
                                ...prev,
                                [ticker]: {
                                    ...prev[ticker],
                                    ticker,
                                    tradeVolume: Number(tradeVolume?.value) ?? prev[ticker]?.tradeVolume,
                                    lastPrice: Number(lastPrice?.value) ?? prev[ticker]?.lastPrice,
                                },
                            }));
                            break;
                        case "STOCK":
                            setStocks((prev) => ({
                                ...prev,
                                [ticker]: {
                                    ...prev[ticker],
                                    ticker,
                                    tradeVolume: Number(tradeVolume?.value) ?? prev[ticker]?.tradeVolume,
                                    lastPrice: Number(lastPrice?.value) ?? prev[ticker]?.lastPrice,
                                },
                            }));
                            break;

                    }
                } else {
                    switch (variableName) {
                        case "FUTURE-RATES":
                            const impliedInterestRate = values.find((val) => val.key === 'Implied_interest_rate');
                            setFutures((prev) => ({
                                ...prev,
                                [ticker]: {
                                    ...prev[ticker],
                                    ticker,
                                    impliedInterestRate: Number(impliedInterestRate?.value) ?? prev[ticker]?.impliedInterestRate,
                                },
                            }));
                            break;
                        case "PRICE-CHANGE":
                            const variation = values.find((val) => val.key === 'Price_change');
                            switch (tickerType) {
                                case "STOCK":
                                    setStocks((prev) => ({
                                        ...prev,
                                        [ticker]: {
                                            ...prev[ticker],
                                            ticker,
                                            variation: Number(variation?.value) ?? prev[ticker]?.variation,
                                        },
                                    }));
                                case "FUTURE":
                                    setFutures((prev) => {
                                        return {
                                            ...prev,
                                            [ticker]: {
                                                ...prev[ticker],
                                                ticker,
                                                variation: !isNaN(Number(variation?.value)) ? Number(variation?.value) : prev[ticker]?.variation ? prev[ticker]?.variation : 0,
                                            },
                                        }
                                    }
                                    );
                            }
                            break;
                        case "DOLLAR-MEP":
                            const dollarMEP = values.find((val) => val.key === 'Dollar_mep');
                            setStocks((prev) => ({
                                ...prev,
                                [ticker]: {
                                    ...prev[ticker],
                                    ticker,
                                    dollarMep: Number(dollarMEP?.value) ?? prev[ticker]?.dollarMEP,
                                },
                            }));
                            break;
                    }
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        });

        socket.on("error", (event) => {
            console.error("WebSocket error:", event);
        });

    }, []);

    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         if (socket) {
    //             socket.close();
    //         }
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [socket]);

    return { stocks: Object.values(stocks), futures: Object.values(futures) };
};
