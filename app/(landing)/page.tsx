"use client";

import { Briefcase } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/** Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left p-10 md:p-20 space-y-10 md:space-y-0">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight md:w-1/2 animate-fade-in">
          Find Jobs Online and Win Bounty Prizes
        </h1>
        <div className="md:w-1/2 flex justify-center">
          <Image
            width={500}
            height={500}
            src={"/hero.webp"}
            alt="hero"
            className="rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/** Footer Section */}
      <div className="border-t p-10 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-7xl font-bold">Job Hunter</h1>
          <Briefcase className="w-16 h-16 text-indigo-600" />
        </div>
        <p className="mt-4 text-gray-600">Copyright © 2024 - All rights reserved</p>
      </div>
    </div>
  );
}
