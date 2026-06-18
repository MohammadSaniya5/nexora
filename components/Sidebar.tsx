"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-950 text-white p-6 fixed left-0 top-0">

      <h1 className="text-2xl font-bold mb-8">NEXORA</h1>

      <div className="flex flex-col gap-4 text-gray-300">

        <Link href="/dashboard">📚 Dashboard</Link>
        <Link href="/dashboard">📊 PPT</Link>
        <Link href="/dashboard">📝 Notes</Link>
        <Link href="/dashboard">📘 QB</Link>

        <hr className="my-4 opacity-20" />

        <Link href="/">🏠 Home</Link>
        <Link href="/about">ℹ️ About</Link>
        <Link href="/contact">📩 Contact</Link>

        <Link href="/admin">🔐 Admin</Link>

      </div>

    </div>
  );
}