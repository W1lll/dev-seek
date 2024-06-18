import React from "react";
import "~/styles/ticker.css";

interface TickerProps {
  stats: string[];
}

const Ticker: React.FC<TickerProps> = ({ stats }) => {
  return (
    <div className="ticker-wrapper">
      <div className="ticker">
        {stats.map((stat, index) => (
            <div key={index} className="ticker__item bg-green-400/15 w-auto px-4 py-1 mr-6 rounded-2xl shadow-2xl text-green-200 text-sm font-medium 2xl:text-md">{stat}</div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
