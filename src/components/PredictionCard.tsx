"use client";

import { Clock, Users } from "lucide-react";
import Link from "next/link";

interface PredictionCardProps {
  id: string;
  creator: {
    name: string;
    platform: string;
    subscribers: string;
    avatar: string;
  };
  question: string;
  current: string;
  target: string;
  timeLeft: string;
  yesPercentage: number;
  totalVotes: number;
  videoUrl?: string;
}

export default function PredictionCard({
  id,
  creator,
  question,
  current,
  target,
  timeLeft,
  yesPercentage,
  totalVotes,
  videoUrl,
}: PredictionCardProps) {
  return (
    <Link href={`/predictions/${id}`} className="block">
      <div className="relative w-full h-screen snap-start snap-always">
        {/* Background Video/Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500">
          {/* Placeholder for video - would be replaced with actual video */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

        {/* Top content */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-white font-semibold text-lg">Roya</span>
          </div>
        </div>

        {/* Swipe up indicator */}
        <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center text-white/80 z-10">
          <span className="text-sm mb-2">Swipe up</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Bottom content card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 mb-4">
            {/* Creator info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{creator.name}</h3>
                <p className="text-white/70 text-sm">
                  {creator.platform} • {creator.subscribers}
                </p>
              </div>
              <div className="bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">
                  {timeLeft}
                </span>
              </div>
            </div>

            {/* Question */}
            <h2 className="text-white text-xl font-bold mb-4">{question}</h2>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/70">
                <Users className="w-4 h-4" />
                <span className="text-sm">{totalVotes.toLocaleString()} fans</span>
              </div>
              <div className="bg-primary/30 backdrop-blur-sm px-6 py-2 rounded-full">
                <span className="text-white font-bold text-lg">
                  {yesPercentage}% YES
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

