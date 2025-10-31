"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Users } from "lucide-react";

const slides = [
  {
    icon: Sparkles,
    title: "Welcome to Roya",
    subtitle: "See what's next 🌙",
    description:
      "Join the next generation of fandom. Predict your favorite creators' milestones and celebrate their journey.",
  },
  {
    icon: TrendingUp,
    title: "Predict the Future",
    subtitle: "Make your call 🎱",
    description:
      "Will MrBeast hit 300M subs? Will Kai stream 100+ hours? You decide what's coming next.",
  },
  {
    icon: Users,
    title: "Join the Community",
    subtitle: "Call it with fans 👥",
    description:
      "See what other fans predict. Build your streak. Celebrate when you call it right.",
  },
];

export default function OnboardingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (ready && authenticated) {
      router.push("/dashboard");
    }
  }, [ready, authenticated, router]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSignUp = () => {
    login();
  };

  const handleSkip = () => {
    router.push("/feed");
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Decorative dots in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse delay-200" />
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/3 right-2/3 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/2 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center space-y-8 transition-all duration-500">
        {/* Icon with shadow */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150" />
          <div className="relative bg-primary rounded-full p-8 shadow-xl">
            <Icon className="w-12 h-12 text-primary-foreground" strokeWidth={2} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-3 px-4">
          <h1 className="text-3xl font-bold text-foreground">{slide.title}</h1>
          <p className="text-xl text-primary font-medium">{slide.subtitle}</p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {slide.description}
          </p>
        </div>

        {/* Pagination dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3 pt-4">
          {currentSlide < slides.length - 1 ? (
            <Button
              onClick={handleNext}
              className="w-full h-14 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSignUp}
                className="w-full h-14 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                Sign Up
              </Button>
              <Button
                onClick={handleSkip}
                variant="ghost"
                className="w-full h-14 text-base font-semibold rounded-full"
                size="lg"
              >
                Skip for now
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


