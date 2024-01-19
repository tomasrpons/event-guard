"use client";

import { useEffect, useState } from "react";

export type TickerDto = {
    [Key in L1Keys]?: Key extends "ticker" ? string : number;
} & {
    variation?: number;
}

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
export type DollarDto = {
    offerPrice: number;
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
    | "priceChange"
    | "impliedInterestRate"
    | "Nominal_interest_rate"
    | "Effective_interest_rate"
    | "dollarMep";
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

const isNumber = (value: unknown): boolean => {
    return typeof value === 'number' && !isNaN(value);
}

const updateTickerValues = (inputData: UpdateTickerInput, setTickerData: React.Dispatch<React.SetStateAction<Record<string, TickerDto | FutureDto | StockDto>>>) => {
    const { ticker, values, tickerType } = inputData;
    const { tradeVolume, lastPrice, variation, impliedInterestRate, dollarMEP } = values;
    const castedTradeVolume = isNumber(tradeVolume?.value) ? Number(tradeVolume?.value) : 0;
    const castedLastPrice = isNumber(lastPrice?.value) ? Number(lastPrice?.value) : 0;
    const castedImpliedInterestRate = isNumber(impliedInterestRate?.value) ? Number(impliedInterestRate?.value) : 0;
    const castedVariation = isNumber(variation?.value) ? Number(variation?.value) : 0;
    const castedDollarMEP = isNumber(dollarMEP?.value) ? Number(dollarMEP?.value) : 0;
    setTickerData((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            tradeVolume: castedTradeVolume === 0 && isNumber(prev[ticker]?.tradeVolume) ? prev[ticker]?.tradeVolume : castedTradeVolume,
            lastPrice: castedLastPrice === 0 && isNumber(prev[ticker]?.lastPrice) ? prev[ticker]?.lastPrice : castedLastPrice,
            impliedInterestRate: castedImpliedInterestRate === 0 && isNumber((prev[ticker] as FutureDto)?.impliedInterestRate) ? (prev[ticker] as FutureDto)?.impliedInterestRate : castedImpliedInterestRate,
            variation: castedVariation === 0 && isNumber(prev[ticker]?.variation) ? prev[ticker]?.variation : castedVariation,
            dollarMEP: castedDollarMEP,
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
    setBonds: React.Dispatch<React.SetStateAction<Record<string, BondDto>>>,
    setDollars: React.Dispatch<React.SetStateAction<Record<string, DollarDto>>>,
) => {
    const primaryData = event.data;
    const data = parsePrimaryData(primaryData);
    if (data) {
        const { ticker, values, variableType, variableName, tickerType } = data;
        const tradeVolume = values.find((val) => val.key === "tradeVolume");
        const lastPrice = values.find((val) => val.key === "lastPrice");
        if (ticker === 'tc-mayorista') {
            const offerPrice = values.find((val) => val.key === 'offerPrice');
            setDollars((prev) => ({
                ...prev,
                [ticker]: {
                    ...prev[ticker],
                    ticker,
                    offerPrice: Number(offerPrice?.value) ?? prev[ticker]?.offerPrice,
                },
            }));
            return;
        }
        if (variableType !== 'L2') {
            switch (tickerType) {
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
                    const impliedInterestRate = values.find((val) => val.key === "impliedInterestRate");
                    updateFutureRates({ ticker, values: { impliedInterestRate } }, setFutures);
                    break;
                case "PRICE-CHANGE":
                    const variation = values.find((val) => val.key === "priceChange");
                    updatePriceChange({ ticker, tickerType, values: { variation } }, setStocks, setFutures, setBonds);
                    break;
                case "DOLLAR-MEP":
                    const dollarMEP = values.find((val) => val.key === "dollarMep");
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
    const [dollars, setDollars] = useState<Record<string, DollarDto>>({});
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        // const socket = new WebSocket(
        //     "ws://ec2-54-174-10-108.compute-1.amazonaws.com:3500",
        // );
        const socket = new WebSocket(
            "ws://localhost:3500",
        );
        setSocket(socket);
        socket.addEventListener("message", (event: MessageEvent<string>) => {
            handleWebSocketMessage(event, setFutures, setStocks, setBonds, setDollars)
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

    return { stocks: Object.values(stocks), futures: Object.values(futures), bonds: Object.values(bonds), dollars: Object.values(dollars) };
};
