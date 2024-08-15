import ScrollToTopButton from "@/app/components/scrollToTopButton";
import Standings from "@/app/components/standings";
import Matches from "@/app/components/matches";

export default async function Home() {
  return (
    <main className="w-full min-h-screen relative bg-slate-950 text-slate-50 selection:bg-lime-500 scroll-smooth">
      <div className="container mx-auto p-4">
        <Standings />
        <Matches />
        <ScrollToTopButton />
      </div>
    </main>
  );
}
