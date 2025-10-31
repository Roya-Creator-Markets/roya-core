"use client";

import { useState, useEffect } from "react";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(true);

  const secretPassword = process.env.NEXT_PUBLIC_SECRET_PASSWORD;

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem("site-auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!secretPassword) {
      setError("Password gate is not configured. Please set NEXT_PUBLIC_SECRET_PASSWORD.");
      return;
    }

    if (password === secretPassword) {
      localStorage.setItem("site-auth", "authenticated");
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Protected Site
              </h1>
              <p className="text-gray-600">
                Please enter the password to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Show children if authenticated
  return <>{children}</>;
}

