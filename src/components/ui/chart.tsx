"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "@/styles/chart.css";

export type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

interface ChartContainerProps {
  children: React.ReactNode;
  config: ChartConfig;
}

export function ChartContainer({ children, config }: ChartContainerProps) {
  return <div className="chart-container relative">{children}</div>;
}

interface ChartTooltipProps {
  children?: React.ReactNode;
  cursor?: boolean;
  content?: React.ReactNode;
}

export function ChartTooltip({
  children,
  cursor = true,
  content,
}: ChartTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        {children ? <TooltipTrigger asChild>{children}</TooltipTrigger> : null}
        <TooltipContent side="top" className="flex items-center gap-2">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium">{label}</div>
        </div>
        <div className="grid gap-1">
          {payload.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-sm font-medium">{item.name}</div>
              </div>
              <div className="text-sm font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
