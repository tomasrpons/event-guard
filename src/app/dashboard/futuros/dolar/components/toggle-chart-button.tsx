"use client";

import { Button } from "~/components/ui/button";
import LineChart from "./line-chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function ToggleChartButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver curva</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between">
            <h2>Tasas implícitas (TNA Y TEA)</h2>
            <span className="text-sm mr-4">
              {new Date().toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </DialogTitle>
          <DialogDescription>Una breve explicación???</DialogDescription>
        </DialogHeader>
        <LineChart />
      </DialogContent>
    </Dialog>
  );
}
