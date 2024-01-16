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

export type BondDto = {
    //
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

const updateTickerValues = (inputData: UpdateTickerInput, setTickerData: React.Dispatch<React.SetStateAction<Record<string, TickerDto | FutureDto | StockDto>>>) => {
    const { ticker, values, tickerType } = inputData;
    const { tradeVolume, lastPrice, variation, impliedInterestRate, dollarMEP } = values;
    setTickerData((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            tradeVolume: Number(tradeVolume?.value) ?? prev[ticker]?.tradeVolume,
            lastPrice: Number(lastPrice?.value) ?? prev[ticker]?.lastPrice,
            impliedInterestRate: (tickerType === "FUTURE") ? Number(impliedInterestRate?.value) ?? (prev[ticker] as FutureDto)?.impliedInterestRate : undefined,
            variation: Number(variation?.value) ?? prev[ticker]?.variation,
            dollarMEP: (tickerType === "STOCK") ? Number(dollarMEP?.value) ?? (prev[ticker] as StockDto)?.dollarMEP : undefined,
        },
    }));
};

const updateFutures = (input: UpdateTickerInput, setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>) => {
    updateTickerValues(input, setFutures)
};

const updateStocks = (input: UpdateTickerInput, setStocks: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>) => {
    updateTickerValues(input, setStocks)
};
const updateBonds = (input: UpdateTickerInput, setBonds: React.Dispatch<React.SetStateAction<Record<string, BondDto>>>) => {
    updateTickerValues(input, setBonds)
};

const handleWebSocketMessage = (event: MessageEvent<string>,
    setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>,
    setStocks: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>,
    setBonds: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>
) => {
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
                case "BOND":
                    updateBonds({ ticker, values: { tradeVolume, lastPrice } }, setBonds);
                    break;
            }
        } else {
            switch (variableName) {
                case "FUTURE-RATES":
                    const impliedInterestRate = values.find((val) => val.key === "Implied_interest_rate");
                    updateFutureRates({ ticker, values: { impliedInterestRate } }, setFutures);
                    break;
                case "PRICE-CHANGE":
                    const variation = values.find((val) => val.key === "Price_change");
                    updatePriceChange({ ticker, tickerType, values: { variation } }, setStocks, setFutures, setBonds);
                    break;
                case "DOLLAR-MEP":
                    const dollarMEP = values.find((val) => val.key === "Dollar_mep");
                    updateDolarMEP({ ticker, values: { dollarMEP } }, setStocks);
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

const updatePriceChange = (input: UpdateTickerInput,
    setStocks: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>,
    setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>,
    setBonds: React.Dispatch<React.SetStateAction<Record<string, BondDto>>>
) => {
    const { ticker, values, tickerType } = input;
    const { variation } = values;
    switch (tickerType) {
        case "STOCK":
            updateTickerValues({ ticker, values: { variation } }, setStocks);
            break;
        case "FUTURE":
            updateTickerValues({ ticker, values: { variation } }, setFutures);
            break;
        case "BOND":
            updateTickerValues({ ticker, values: { variation } }, setBonds);
            break;
    }
};

const updateDolarMEP = (input: UpdateTickerInput, setStocks: React.Dispatch<React.SetStateAction<Record<string, StockDto>>>) => {
    const { ticker, values } = input;
    const { dollarMEP } = values;
    updateTickerValues({ ticker, values: { dollarMEP } }, setStocks);
};

export const usePrimary = () => {
    const [futures, setFutures] = useState<Record<string, FutureDto>>({});
    const [stocks, setStocks] = useState<Record<string, StockDto>>({});
    const [bonds, setBonds] = useState<Record<string, BondDto>>({});
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const socket = new WebSocket(
            "ws://ec2-54-174-10-108.compute-1.amazonaws.com:3500",
        );
        setSocket(socket);

        socket.addEventListener("message", (event: MessageEvent<string>) => {
            handleWebSocketMessage(event, setFutures, setStocks, setBonds)
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

    return { stocks: Object.values(stocks), futures: Object.values(futures), bonds: Object.values(bonds) };
};
