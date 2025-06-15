"use client";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  PoundSterling,
  JapaneseYen,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const majorPairs = [
  {
    pair: "EUR/USD",
    price: "1.0854",
    change: "+0.12%",
    trend: "up",
    icon: Euro,
    data: [
      { time: "Jan", value: 1.0754, volume: 1200 },
      { time: "Feb", value: 1.0789, volume: 1500 },
      { time: "Mar", value: 1.0823, volume: 1800 },
      { time: "Apr", value: 1.0854, volume: 1600 },
      { time: "May", value: 1.0889, volume: 1900 },
      { time: "Jun", value: 1.0923, volume: 2100 },
    ],
  },
  {
    pair: "GBP/USD",
    price: "1.2654",
    change: "-0.08%",
    trend: "down",
    icon: PoundSterling,
    data: [
      { time: "Jan", value: 1.2754, volume: 900 },
      { time: "Feb", value: 1.2723, volume: 1100 },
      { time: "Mar", value: 1.2689, volume: 1300 },
      { time: "Apr", value: 1.2654, volume: 1200 },
      { time: "May", value: 1.2623, volume: 1400 },
      { time: "Jun", value: 1.2598, volume: 1600 },
    ],
  },
  {
    pair: "USD/JPY",
    price: "151.24",
    change: "+0.25%",
    trend: "up",
    icon: JapaneseYen,
    data: [
      { time: "Jan", value: 150.89, volume: 800 },
      { time: "Feb", value: 150.95, volume: 1000 },
      { time: "Mar", value: 151.1, volume: 1200 },
      { time: "Apr", value: 151.24, volume: 1100 },
      { time: "May", value: 151.45, volume: 1300 },
      { time: "Jun", value: 151.68, volume: 1500 },
    ],
  },
  {
    pair: "USD/CHF",
    price: "0.9054",
    change: "-0.15%",
    trend: "down",
    icon: DollarSign,
    data: [
      { time: "Jan", value: 0.9154, volume: 600 },
      { time: "Feb", value: 0.9123, volume: 800 },
      { time: "Mar", value: 0.9089, volume: 1000 },
      { time: "Apr", value: 0.9054, volume: 900 },
      { time: "May", value: 0.9023, volume: 1100 },
      { time: "Jun", value: 0.8998, volume: 1300 },
    ],
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </p>
        <p className="text-sm text-blue-500">Price: {payload[0].value}</p>
        <p className="text-sm text-green-600">Volume: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

const MarketOverview = () => {
  const [selectedPair, setSelectedPair] = useState(majorPairs[0]);

  return (
    <div className="w-full lg:h-[95%] xl:h-[100%] h-full rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg md:text-2xl font-bold">
          Market Overview
        </h2>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
          Live Forex Rates
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent -mx-3 px-3">
        {majorPairs.map(pair => (
          <Button
            key={pair.pair}
            variant={selectedPair.pair === pair.pair ? "default" : "outline"}
            className={`font-light rounded-full items-center gap-2 min-w-[80px] sm:min-w-[90px] md:min-w-[120px] whitespace-nowrap ${
              selectedPair.pair === pair.pair
                ? "bg-blue-600 text-white hover:bg-blue-600"
                : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
            }`}
            onClick={() => setSelectedPair(pair)}
          >
            <pair.icon className="w-3 h-3 sm:w-4 sm:h-4 font-light" />
            <span className="text-xs sm:text-sm md:text-base">{pair.pair}</span>
          </Button>
        ))}
      </div>

      <Card className="mb-4 sm:mb-6 h-[80%] rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.5rem] border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <CardTitle className="text-sm sm:text-base md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                {selectedPair.pair} Price Movement
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Showing price and volume data for the last 6 months
              </CardDescription>
            </div>
            <div
              className={`flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full ${
                selectedPair.trend === "up"
                  ? "bg-green-50 dark:bg-green-900/20"
                  : "bg-red-50 dark:bg-red-900/20"
              }`}
            >
              {selectedPair.trend === "up" ? (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
              )}
              <span
                className={`text-xs sm:text-sm font-medium ${
                  selectedPair.trend === "up"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {selectedPair.change}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="h-[250px] sm:h-[200px] md:h-[300px] lg:h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={selectedPair.data}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="volume"
                  stroke="#16a34a"
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 md:p-6">
          <div className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">Price</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600"></div>
                <span className="text-muted-foreground">Volume</span>
              </div>
            </div>
            <div className="text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MarketOverview;
