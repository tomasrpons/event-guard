"use client";

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
} & TickerDto;

export type StockDto = {
    dollarMEP?: number;
} & TickerDto;

type L1Keys =
    | "ticker"
    | "tickerType"
    | "operationDate"
    | "marketId"
    | "lastPrice"
    | "lastSize"
    | "bidPrice"
    | "bidSize"
    | "offerPrice"
    | "offerSize"
    | "openingPrice"
    | "closingPrice"
    | "tradeVolume";
type L2Keys =
    | "Price_change"
    | "Implied_interest_rate"
    | "Nominal_interest_rate"
    | "Effective_interest_rate"
    | "Dollar_mep";
type ValueKeys = L2Keys | L1Keys;
type TickerType = "STOCK" | "BOND" | "FUTURE" | "CEDEAR";

export type TickerValues = {
    key: ValueKeys;
    value: string | number | Date;
};
export type VariableType = "FUTURE" | "STOCK" | "L2" | "BOND";
export type VariableName =
    | "Ticker"
    | "FUTURE-RATES"
    | "DOLLAR-MEP"
    | "CEDEAR-EXCHANGE-RATE"
    | "DOLLAR-CCL"
    | "PRICE-CHANGE";
export type EventGuardTickerDto = {
    ticker: string;
    variableType: VariableType;
    variableName: VariableName;
    tickerType: TickerType;
    values: TickerValues[];
};
type UpdateTickerInput = {
    ticker: string;
    tickerType?: TickerType;
    values: { tradeVolume?: TickerValues; lastPrice?: TickerValues, impliedInterestRate?: TickerValues, variation?: TickerValues, dollarMEP?: TickerValues }
}
const parsePrimaryData = (primaryData: string): EventGuardTickerDto | null => {
    try {
        return JSON.parse(primaryData) as EventGuardTickerDto;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
};

const updateFutures = (input: UpdateTickerInput, setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>) => {
    const { ticker, values } = input;
    const { tradeVolume, lastPrice } = values;
    setFutures((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            tradeVolume:
                Number(tradeVolume?.value) ?? prev[ticker]?.tradeVolume,
            lastPrice:
                Number(lastPrice?.value) ?? prev[ticker]?.lastPrice,
        },
    }));
};

const updateStocks = (input: UpdateTickerInput, setStocks: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>) => {
    const { ticker, values } = input;
    const { tradeVolume, lastPrice } = values;
    setStocks((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            tradeVolume:
                Number(tradeVolume?.value) ?? prev[ticker]?.tradeVolume,
            lastPrice:
                Number(lastPrice?.value) ?? prev[ticker]?.lastPrice,
        },
    }));
};

const handleWebSocketMessage = (event: MessageEvent<string>, setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>, setStocks: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>) => {
    const primaryData = event.data;
    const data = parsePrimaryData(primaryData);

    if (data) {
        const { ticker, values, variableType, variableName, tickerType } = data;
        const tradeVolume = values.find((val) => val.key === "tradeVolume");
        const lastPrice = values.find((val) => val.key === "lastPrice");
        if (variableType !== 'L2') {
            switch (variableType) {
                case "FUTURE":
                    updateFutures({ ticker, values: { tradeVolume, lastPrice } }, setFutures);
                    break;
                case "STOCK":
                    updateStocks({ ticker, values: { tradeVolume, lastPrice } }, setStocks);
                    break;
            }
        } else {
            switch (variableName) {
                case "FUTURE-RATES":
                    const impliedInterestRate = values.find((val) => val.key === "Implied_interest_rate");
                    updateFutureRates({ ticker, values: { impliedInterestRate } }, setFutures);
                    break;
                case "PRICE-CHANGE":
                    const variation = values.find(
                        (val) => val.key === "Price_change",
                    );
                    updatePriceChange({ ticker, tickerType, values: { variation } }, setStocks, setFutures);
                    break;
                case "DOLLAR-MEP":
                    const dollarMEP = values.find((val) => val.key === "Dollar_mep");
                    updatedolarMEP({ ticker, values: { dollarMEP } }, setStocks);
                    break;
            }
        }
    }
};

const updateFutureRates = (input: UpdateTickerInput, setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>) => {
    const { values, ticker } = input;
    const { impliedInterestRate } = values;
    setFutures((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            impliedInterestRate:
                Number(impliedInterestRate?.value) ??
                prev[ticker]?.impliedInterestRate,
        },
    }));
};

const updatePriceChange = (input: UpdateTickerInput, setStocks: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>, setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>) => {
    const { values, ticker, tickerType } = input;
    const { variation } = values
    switch (tickerType) {
        case "STOCK":
            setStocks((prev) => ({
                ...prev,
                [ticker]: {
                    ...prev[ticker],
                    ticker,
                    variation:
                        Number(variation?.value) ?? prev[ticker]?.variation,
                },
            }));
        case "FUTURE":
            setFutures((prev) => {
                return {
                    ...prev,
                    [ticker]: {
                        ...prev[ticker],
                        ticker,
                        variation: !isNaN(Number(variation?.value))
                            ? Number(variation?.value)
                            : prev[ticker]?.variation
                                ? prev[ticker]?.variation
                                : 0,
                    },
                };
            });
    }
}

const updatedolarMEP = (input: UpdateTickerInput, setStocks: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>) => {
    const { ticker, values } = input;
    const { dollarMEP } = values;
    setStocks((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            dollarMep:
                Number(dollarMEP?.value) ?? prev[ticker]?.dollarMEP,
        },
    }));
}

export const usePrimary = () => {
    const [futures, setFutures] = useState<Record<string, FutureDto>>({});
    const [stocks, setStocks] = useState<Record<string, StockDto>>({});
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const socket = new WebSocket(
            "ws://ec2-54-174-10-108.compute-1.amazonaws.com:3500",
        );
        setSocket(socket);
        socket.addEventListener("message", (event) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
            handleWebSocketMessage(event, setFutures, setStocks)
        });

        socket.addEventListener("error", (event) => {
            console.error("WebSocket error:", event);
        });
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (socket) {
                socket.close();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [socket]);

    return { stocks: Object.values(stocks), futures: Object.values(futures) };
};
