"use client";

import { useState } from "react";
import { ArrowLeft, Settings, Wallet, TrendingUp, Activity, CheckCircle, XCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

// Mock data - will be replaced with real data later
const mockUserData = {
  name: "John Doe",
  username: "@johndoe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  balance: 1247.50,
  active: 3,
  winRate: 50,
  invested: 155,
  unrealizedPnL: 21.50,
};

const mockActivePredictions = [
  {
    id: "1",
    creator: {
      name: "MrBeast",
      platform: "YouTube",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mrbeast",
    },
    question: "Will MrBeast gain 2M subscribers this week? 🔥",
    vote: "YES",
    invested: 50,
    current: 68,
    potential: 73.5,
    yesPercentage: 68,
    timeLeft: "5 days left",
  },
  {
    id: "2",
    creator: {
      name: "Emma Chamberlain",
      platform: "Instagram",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    question: "Will Emma gain 1M likes on her next reel? 👁",
    vote: "YES",
    invested: 75,
    current: 92,
    potential: 102.75,
    yesPercentage: 73,
    timeLeft: "2 days left",
  },
];

const mockHistory = [
  {
    id: "1",
    creator: {
      name: "Pokimane",
      platform: "YouTube",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=poki",
    },
    question: "Will Pokimane hit 10M YouTube subs? 💫",
    vote: "YES",
    invested: 100,
    result: "WON",
    payout: 22.00,
    timestamp: "2 days ago",
  },
  {
    id: "2",
    creator: {
      name: "Ludwig",
      platform: "Twitch",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ludwig",
    },
    question: "Will Ludwig reach 3M Twitch followers this month? 🎮",
    vote: "NO",
    invested: 80,
    result: "LOST",
    payout: 0,
    timestamp: "5 days ago",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Profile</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl shadow-lg p-8 text-white">
          {/* User info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-white overflow-hidden border-4 border-white/30">
              <img
                src={mockUserData.avatar}
                alt={mockUserData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{mockUserData.name}</h2>
              <p className="text-blue-100">{mockUserData.username}</p>
            </div>
          </div>

          {/* Balance */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4" />
              <span className="text-sm text-blue-100">USDC Balance</span>
            </div>
            <div className="text-5xl font-bold">$ {mockUserData.balance.toFixed(2)}</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
            <div>
              <div className="text-blue-100 text-sm mb-1">Active</div>
              <div className="text-2xl font-bold">{mockUserData.active}</div>
            </div>
            <div>
              <div className="text-blue-100 text-sm mb-1">Win Rate</div>
              <div className="text-2xl font-bold">{mockUserData.winRate}%</div>
            </div>
            <div>
              <div className="text-blue-100 text-sm mb-1">Invested</div>
              <div className="text-2xl font-bold">${mockUserData.invested}</div>
            </div>
          </div>
        </div>

        {/* Unrealized P&L */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="w-5 h-5" />
            <span className="font-medium">Unrealized P&L</span>
          </div>
          <div className="flex items-center gap-1 text-green-600 font-semibold text-lg">
            <TrendingUp className="w-5 h-5" />
            <span>+{mockUserData.unrealizedPnL.toFixed(2)} USDC</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition ${
              activeTab === "active"
                ? "bg-white text-foreground shadow-sm"
                : "bg-gray-100 text-muted-foreground"
            }`}
          >
            Active ({mockActivePredictions.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition ${
              activeTab === "history"
                ? "bg-white text-foreground shadow-sm"
                : "bg-gray-100 text-muted-foreground"
            }`}
          >
            History ({mockHistory.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4 space-y-4">
          {activeTab === "active" &&
            mockActivePredictions.map((prediction) => (
              <div
                key={prediction.id}
                className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-primary"
              >
                {/* Creator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                      <img
                        src={prediction.creator.avatar}
                        alt={prediction.creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {prediction.creator.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {prediction.creator.platform}
                      </p>
                    </div>
                  </div>
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {prediction.vote}
                  </span>
                </div>

                {/* Question */}
                <h4 className="font-semibold mb-4">{prediction.question}</h4>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Invested</p>
                    <p className="font-semibold">${prediction.invested}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current</p>
                    <p className="font-semibold">${prediction.current}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Potential</p>
                    <p className="font-semibold text-primary">${prediction.potential}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{prediction.yesPercentage}% YES</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{prediction.timeLeft}</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${prediction.yesPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}

          {activeTab === "history" &&
            mockHistory.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-sm p-5 border-l-4 ${
                  item.result === "WON" ? "border-green-500" : "border-red-500"
                }`}
              >
                {/* Creator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                      <img
                        src={item.creator.avatar}
                        alt={item.creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.creator.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 font-bold text-sm ${
                      item.result === "WON" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.result === "WON" ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span>{item.result}</span>
                  </div>
                </div>

                {/* Question */}
                <h4 className="font-semibold mb-4">{item.question}</h4>

                {/* Result */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Predicted {item.vote}</p>
                      <p className="font-semibold">Invested ${item.invested}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.result === "WON" ? "Payout" : "Lost"}
                      </p>
                      <p
                        className={`font-bold text-lg ${
                          item.result === "WON" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.result === "WON" ? `+$${item.payout.toFixed(2)}` : `-$${item.invested}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

