import PredictionFeed from "@/components/PredictionFeed";
import BottomNav from "@/components/BottomNav";

// Force dynamic rendering since we use cookies for auth
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <PredictionFeed />
      <BottomNav />
    </div>
  );
}
