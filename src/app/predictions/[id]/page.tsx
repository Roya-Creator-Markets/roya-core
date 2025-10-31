"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - will be replaced with real data later
const mockPrediction = {
  id: "1",
  creator: {
    name: "MrBeast",
    platform: "YouTube",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mrbeast",
  },
  question: "Will MrBeast gain 2M subscribers this week? 🔥",
  current: "289.0M",
  target: "291.0M",
  timeLeft: "5 days left",
  yesPercentage: 68,
  totalVotes: 12453,
  insights: [
    "Last 3 videos averaged 75M views each",
    "Historically gains 1.5-2M subs per week",
    "New video scheduled for tomorrow",
  ],
  growthData: {
    trend: "Trending up",
    dailyGain: "~400K subscribers per day this week",
  },
  comments: [
    {
      id: "1",
      user: "Sarah K.",
      vote: "YES",
      comment: "His last video got 80M views in 3 days. Easy YES 🔥",
      timestamp: "2h ago",
      avatar: "S",
    },
    {
      id: "2",
      user: "Alex M.",
      vote: "YES",
      comment: "Growth has been slowing down lately, but still think he'll make it",
      timestamp: "5h ago",
      avatar: "A",
    },
    {
      id: "3",
      user: "Jamie L.",
      vote: "NO",
      comment: "2M in a week is a lot even for MrBeast",
      timestamp: "8h ago",
      avatar: "J",
    },
  ],
};

export default function PredictionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "community">("overview");

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
              <img
                src={mockPrediction.creator.avatar}
                alt={mockPrediction.creator.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-sm">{mockPrediction.creator.name}</h2>
              <p className="text-xs text-muted-foreground">
                {mockPrediction.creator.platform}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 space-y-4">
        {/* Prediction Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h1 className="text-xl font-bold mb-6">{mockPrediction.question}</h1>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current</p>
              <p className="font-semibold">{mockPrediction.current}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Target</p>
              <p className="font-semibold text-primary">{mockPrediction.target}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Time</p>
              <p className="font-semibold">{mockPrediction.timeLeft}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{mockPrediction.totalVotes.toLocaleString()} fans</span>
              </div>
              <span className="font-semibold text-primary">
                {mockPrediction.yesPercentage}% say YES
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${mockPrediction.yesPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-white text-muted-foreground hover:bg-gray-50"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition ${
              activeTab === "community"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-white text-muted-foreground hover:bg-gray-50"
            }`}
          >
            Community
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Subscriber Growth Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Subscriber Growth</h3>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {mockPrediction.growthData.trend}
                </span>
              </div>

              {/* Placeholder for chart */}
              <div className="h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-center text-muted-foreground text-sm">
                  📊 Chart visualization
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 text-center text-xs mb-4">
                {["Mon", "Tue", "Wed", "Thu", "Today"].map((day) => (
                  <div key={day} className="text-muted-foreground">{day}</div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                {mockPrediction.growthData.dailyGain}
              </p>
            </div>

            {/* Insights Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Insights</h3>
              <ul className="space-y-3">
                {mockPrediction.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "community" && (
          <div className="space-y-4">
            {mockPrediction.comments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{comment.user}</span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          comment.vote === "YES"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {comment.vote}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Join conversation */}
            <button className="w-full bg-white rounded-2xl shadow-sm p-5 text-muted-foreground text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Join the conversation
            </button>
          </div>
        )}
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button className="w-full h-14 text-base font-semibold rounded-full shadow-lg">
          Make Your Call 🎱
        </Button>
      </div>
    </div>
  );
}

