"use client";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="h-14 border-b border-white/10 bg-neutral-950/80 backdrop-blur flex items-center justify-between px-4">
      <div className="opacity-80">Welcome</div>
      <nav className="flex items-center gap-3">
        <Link href="/" className="text-sm hover:text-blue-400">Home</Link>
        <Link href="/register" className="text-sm hover:text-blue-400">Register</Link>
        <Link href="/login" className="text-sm hover:text-blue-400">Login</Link>
      </nav>
    </header>
  );
}
