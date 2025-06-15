"use client";

import React, { useEffect } from "react";

// Declare global types for the widget object
declare global {
  interface Window {
    Widget: {
      init: (config: WidgetConfig) => void;
    };
  }

  interface WidgetConfig {
    widgetId: string;
    type: string;
    language: string;
    isAdaptive: boolean;
    withBorderBox: boolean;
    symbolIds: number[];
  }
}

const FinlogixWidget: React.FC = () => {
  useEffect(() => {
    // Check if the script is already added
    if (
      !document.querySelector(
        `script[src="https://widget.finlogix.com/Widget.js"]`,
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://widget.finlogix.com/Widget.js";
      script.async = true;

      script.onload = () => {
        if (window.Widget) {
          window.Widget.init({
            widgetId: "5f716dd3-5668-424c-8f14-d833082ceb32",
            type: "SentimentOverview",
            language: "en",

            isAdaptive: true,
            withBorderBox: true,
            symbolIds: [
              44, 36, 31, 9, 12, 25, 20, 5, 3, 29, 28, 19, 43, 11, 14, 23, 7, 1,
            ],
          });
        }
      };

      document.body.appendChild(script);
    } else if (window.Widget) {
      // Initialize widget if script is already loaded
      window.Widget.init({
        widgetId: "5f716dd3-5668-424c-8f14-d833082ceb32",
        type: "SentimentOverview",
        language: "en",
        isAdaptive: true,
        withBorderBox: true,
        symbolIds: [
          44, 36, 31, 9, 12, 25, 20, 5, 3, 29, 28, 19, 43, 11, 14, 23, 7, 1,
        ],
      });
    }

    return () => {
      // No cleanup needed since we're ensuring a single script
    };
  }, []);

  return <div className="finlogix-container w-full  "></div>;
};

export default FinlogixWidget;
