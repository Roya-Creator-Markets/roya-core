import PredictionFeed from "@/components/PredictionFeed";
import BottomNav from "@/components/BottomNav";

export default function FeedPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <PredictionFeed />
      <BottomNav />
    </div>
  );
}

