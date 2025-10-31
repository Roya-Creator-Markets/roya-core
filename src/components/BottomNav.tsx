"use client";

import { Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/feed" || pathname === "/dashboard";
  const isProfile = pathname === "/profile";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around h-20 max-w-md mx-auto px-8">
        <Link
          href="/feed"
          className={`flex flex-col items-center justify-center flex-1 gap-1 transition ${
            isHome ? "text-primary" : "text-gray-400"
          }`}
        >
          <div
            className={`p-3 rounded-2xl transition ${
              isHome ? "bg-blue-50" : "bg-transparent"
            }`}
          >
            <Home className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center flex-1 gap-1 transition ${
            isProfile ? "text-primary" : "text-gray-400"
          }`}
        >
          <div
            className={`p-3 rounded-2xl transition ${
              isProfile ? "bg-blue-50" : "bg-transparent"
            }`}
          >
            <User className="w-6 h-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}

