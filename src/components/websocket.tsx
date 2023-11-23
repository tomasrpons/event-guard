"use client";
import React, { useEffect, useState } from "react";
import BidTable from "./bid-table";

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
    BI: {
      price: number;
      size: number;
    }[];
    LA: {
      price: number;
      size: number;
      date: string;
    };
    OF: {
      price: number;
      size: number;
    }[];
  };
};

type WebSocketComponentProps = {
  // onMessageReceived: (data: PrimaryData) => void;
};

const WebSocketComponent: React.FC<WebSocketComponentProps> = (props) => {
  const [bids, setBids] = useState<PrimaryData[]>([]);
  useEffect(() => {
    // Code for connecting to the WebSocket
    const socket = new WebSocket("ws://localhost:3500");

    // Event listener for when the connection is established
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    // Event listener for when a message is received from the WebSocket
    socket.addEventListener("message", (event) => {
      const primaryData = event.data as string;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: PrimaryData = JSON.parse(primaryData);
      console.log("data", data);
      setBids((prevValues) => {
        return [...prevValues, data];
      });
      // Handle the received data as needed
    });

    // Event listener for errors in the WebSocket connection
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    // Event listener for when the WebSocket connection is closed
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="flex w-full flex-row justify-around">
      <BidTable data={bids} type="futures" />
      <BidTable data={bids} type="spot" />
    </div>
  );
};

export default WebSocketComponent;
