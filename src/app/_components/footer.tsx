import React from "react";
import Ticker from "./ticker";

type Props = {
  postCount: number;
  userCount: number;
};

export default function Footer({ postCount, userCount }: Props) {
  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden whitespace-nowrap px-4 py-4 sm:px-6 lg:px-8">
      <Ticker stats={[`${postCount > 0 ? postCount : "0"} Job Listings`, `${userCount > 0 ? userCount : "0"} Users`]} />
    </div>
  );
}
