import Matches from "@/app/components/matches";
import Navbar from "@/app/components/navbar";
import ScrollToTopButton from "@/app/components/scrollToTopButton";

export default function MatchesPage() {
  return (
    <main className="w-full min-h-screen relative bg-slate-950 text-slate-50 selection:bg-lime-500 scroll-smooth">
      <Navbar />
      <div className="container mx-auto p-4">
        <Matches />
        <ScrollToTopButton />
      </div>
    </main>
  );
}
