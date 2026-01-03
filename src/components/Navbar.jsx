import Link from "next/link";
import { Home, ShieldCheck, Film } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900"
        >
          <Film className="h-6 w-6 text-indigo-600" />
          BookMyShow
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-indigo-600"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-white transition hover:bg-indigo-700"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
