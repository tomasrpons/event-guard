"use client";

import { useEffect, useState } from "react";

export type TickerDto = {
    [Key in L1Keys]?: Key extends "ticker" ? string : Key extends "operationDate" ? Date : number;
} & {
    variation?: number;
}

export type FutureDto = {
    impliedInterestRate?: number;
    nominalInterestRate?: number;
    effectiveInterestRate?: number;
    forwardTem?: number;
    forwardMaturity?: string;
    forwardContractSegment?: ForwardContractSegment;
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

type TickerType = "STOCK" | "BOND" | "FUTURE" | "CEDEAR";

type ForwardContractSegment = "STOCK"
    | "BOND"
    | "BITCOIN"
    | "ORO"
    | "DOLAR"
    | "DOLAR-A"
    | "YUAN"
    | "ROFEX20-INDEX"
    | "OIL-COMMODITY"
    | "SOJA"
    | "SOJA-MINI"
    | "SOJA-CHICAGO"
    | "MAIZ"
    | "MAIZ-MINI"
    | "MAIZ-CHICAGO"
    | "TRIGO"
    | "TRIGO-MINI"
    | "NOT-FORWARD";

type ValueTypes = {
    ticker: string;
    tickerType: string;
    operationDate: Date;
    marketId: string;
    lastPrice: number;
    lastSize: number;
    bidPrice: number;
    bidSize: number;
    offerPrice: number;
    offerSize: number;
    forwardTem: number;
    openingPrice: number;
    closingPrice: number;
    tradeVolume: number;
    priceChange: number;
    impliedInterestRate: number;
    nominalInterestRate: number;
    effectiveInterestRate: number;
    forwardMaturity: string;
    forwardContractSegment?: ForwardContractSegment;
    dollarMep: number;
    variation: number;
};

type ValueKeys = keyof ValueTypes;

export type TickerValues = {
    key: ValueKeys;
    value: ValueTypes[ValueKeys];
};

export type VariableType = "FUTURE" | "STOCK" | "L1" | "L2" | "BOND";
export type VariableName =
    | "Ticker"
    | "FUTURE-RATES"
    | "DOLLAR-MEP"
    | "CEDEAR-EXCHANGE-RATE"
    | "DOLLAR-CCL"
    | "PRICE-CHANGE"
    | "FORWARD-DURATION"
    | "FORWARD-RATES";
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
    values: {
        tradeVolume?: TickerValues;
        lastPrice?: TickerValues;
        impliedInterestRate?: TickerValues;
        nominalInterestRate?: TickerValues;
        effectiveInterestRate?: TickerValues;
        variation?: TickerValues;
        forwardMaturity?: TickerValues;
        dollarMEP?: TickerValues;
        forwardTem?: TickerValues;
        closingPrice?: TickerValues;
        forwardContractSegment?: TickerValues;
    }
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
    const { ticker, values } = inputData;
    const { tradeVolume, lastPrice, variation, closingPrice, impliedInterestRate, dollarMEP, forwardContractSegment } = values;
    const castedTradeVolume = isNumber(tradeVolume?.value) ? Number(tradeVolume?.value) : 0;
    const castedLastPrice = isNumber(lastPrice?.value) ? Number(lastPrice?.value) : 0;
    const castedImpliedInterestRate = isNumber(impliedInterestRate?.value) ? +Number(impliedInterestRate?.value).toFixed(2) : 0;
    const castedVariation = isNumber(variation?.value) ? Number(variation?.value) : 0;
    const castedDollarMEP = isNumber(dollarMEP?.value) ? Number(dollarMEP?.value) : 0;
    const castedForwardConstractSegment = typeof forwardContractSegment?.value === 'string' ? forwardContractSegment?.value : null; 
    const castedClosingPrice = isNumber(closingPrice?.value) ? Number(closingPrice?.value) : 0 
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
            closingPrice: castedClosingPrice === 0 && isNumber(prev[ticker]?.closingPrice) ? prev[ticker]?.closingPrice : castedClosingPrice,
            forwardContractSegment: castedForwardConstractSegment ?? (prev[ticker] as FutureDto)?.forwardContractSegment,
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

const handleWebSocketMessage = (
    event: MessageEvent<string>,
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
        const closingPrice = values.find((val) => val.key === "closingPrice");
        const forwardContractSegment = values.find((val) => val.key === "forwardContractSegment");
        if (ticker === 'tc-mayorista' || ticker === 'I.CCL' || ticker === 'I.RFX20') {
            const offerPrice = values.find((val) => val.key === 'offerPrice');
            const operationDate = values.find((val) => val.key === 'operationDate') ?? { key: 'operationDate', value: new Date() };
            setDollars((prev) => ({
                ...prev,
                [ticker]: {
                    ...prev[ticker],
                    ticker,
                    offerPrice: Number(offerPrice?.value) ?? prev[ticker]?.offerPrice,
                    operationDate: operationDate.value as Date,
                },
            }));
            return;
        }
        if (variableType === 'L1') {
            switch (tickerType) {
                case "FUTURE":
                    updateFutures({ ticker, values: { tradeVolume, lastPrice, closingPrice, forwardContractSegment } }, setFutures);
                    break;
                case "STOCK":
                    updateStocks({ ticker, values: { tradeVolume, lastPrice, closingPrice, forwardContractSegment } }, setStocks);
                    break;
                case "BOND":
                    updateBonds({ ticker, values: { tradeVolume, lastPrice, forwardContractSegment } }, setBonds);
                    break;
            }
        } else if (variableType === "L2") {
            switch (variableName) {
                case "FUTURE-RATES":
                    const impliedInterestRate = values.find((val) => val.key === "impliedInterestRate");
                    const nominalInterestRate = values.find((val) => val.key === "nominalInterestRate");
                    const effectiveInterestRate = values.find((val) => val.key === "effectiveInterestRate");
                    updateFutureRates({ ticker, values: { impliedInterestRate, nominalInterestRate, effectiveInterestRate } }, setFutures);
                    break;
                case "FORWARD-RATES":
                    const forwardTem = values.find((val) => val.key === "forwardTem");
                    updateForwardRates({ ticker, values: { forwardTem } }, setFutures);
                    break;
                case "FORWARD-DURATION":
                    const forwardMaturity = values.find((val) => val.key === "forwardMaturity");
                    updateForwardDuration({ ticker, values: { forwardMaturity } }, setFutures);
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
    const { impliedInterestRate, nominalInterestRate, effectiveInterestRate } = values;
    setFutures((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            impliedInterestRate:
                +(Number(impliedInterestRate?.value) * 100).toFixed(2) ??
                prev[ticker]?.impliedInterestRate,
            nominalInterestRate: +(Number(nominalInterestRate?.value) * 100).toFixed(2) ??
                prev[ticker]?.nominalInterestRate,
            effectiveInterestRate: +(Number(effectiveInterestRate?.value) * 100).toFixed(2) ??
                prev[ticker]?.effectiveInterestRate,
        },
    }));
};

const updateForwardDuration = (input: UpdateTickerInput, setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>) => {
    const { values, ticker } = input;
    const { forwardMaturity } = values;
    setFutures((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            forwardMaturity:
                forwardMaturity?.value as string ??
                prev[ticker]?.forwardMaturity,
        },
    }));
};

const updateForwardRates = (input: UpdateTickerInput, setFutures: React.Dispatch<React.SetStateAction<Record<string, FutureDto>>>) => {
    const { values, ticker } = input;
    const { forwardTem } = values;
    setFutures((prev) => ({
        ...prev,
        [ticker]: {
            ...prev[ticker],
            ticker,
            forwardTem:
                +(Number(forwardTem?.value) * 100).toFixed(2) ??
                prev[ticker]?.forwardTem,
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
        const socket = new WebSocket(
            process.env.NODE_ENV === 'production' ? "ws://ec2-54-208-218-254.compute-1.amazonaws.com:3500" : "ws://localhost:3500",
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
