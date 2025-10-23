"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 border-r border-white/10 bg-neutral-950 min-h-screen sticky top-0">
      <div className="px-5 py-4 text-xl font-bold text-[var(--primary)]">
        Luminaflow.ai
      </div>
      <nav className="px-3 py-2 space-y-1">
        {links.map((l) => {
          const active = pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-3 py-2 rounded ${
                active ? "bg-blue-600 text-white" : "hover:bg-neutral-800"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
