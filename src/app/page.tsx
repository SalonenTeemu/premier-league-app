import Standings from "@/app/components/standings";
import Navbar from "@/app/components/navbar";
import ScrollToTopButton from "@/app/components/scrollToTopButton";

export default function Home() {
  return (
    <main className="w-full min-h-screen relative bg-slate-950 text-slate-50 selection:bg-lime-500 scroll-smooth">
      <Navbar />
      <div className="container mx-auto p-4">
        <Standings />
        <ScrollToTopButton />
      </div>
    </main>
  );
}
