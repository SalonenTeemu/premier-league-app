import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 py-2">
      <div className="container mx-auto flex justify-center space-x-20">
        <Link
          href="/"
          className="text-md font-bold text-slate-50 hover:text-lime-500"
        >
          Standings
        </Link>
        <Link
          href="/matches"
          className="text-md font-bold text-slate-50 hover:text-lime-500"
        >
          Fixtures
        </Link>
      </div>
    </nav>
  );
}
