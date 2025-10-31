"use client";

import { useRef, useEffect } from "react";
import PredictionCard from "./PredictionCard";

// Mock data - will be replaced with real data later
const mockPredictions = [
  {
    id: "1",
    creator: {
      name: "MrBeast",
      platform: "YouTube",
      subscribers: "289M subs",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mrbeast",
    },
    question: "Will MrBeast gain 2M subscribers this week? 🔥",
    current: "289.0M",
    target: "291.0M",
    timeLeft: "5 days left",
    yesPercentage: 68,
    totalVotes: 12453,
  },
  {
    id: "2",
    creator: {
      name: "Kai Cenat",
      platform: "Twitch",
      subscribers: "12.5M followers",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kai",
    },
    question: "Will Kai stream 100+ hours this month? 🎮",
    current: "78 hours",
    target: "100 hours",
    timeLeft: "10 days left",
    yesPercentage: 82,
    totalVotes: 8934,
  },
  {
    id: "3",
    creator: {
      name: "Pokimane",
      platform: "Twitch",
      subscribers: "9.3M followers",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=poki",
    },
    question: "Will Poki hit 10M followers this quarter? 🎯",
    current: "9.3M",
    target: "10M",
    timeLeft: "45 days left",
    yesPercentage: 73,
    totalVotes: 15782,
  },
];

export default function PredictionFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Enable scroll snap
    container.style.scrollSnapType = "y mandatory";
    container.style.overflowY = "scroll";
    container.style.height = "100vh";
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {mockPredictions.map((prediction) => (
        <PredictionCard key={prediction.id} {...prediction} />
      ))}
    </div>
  );
}

