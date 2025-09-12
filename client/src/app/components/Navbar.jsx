"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <Link href="/" className="text-xl font-bold">Travelfree</Link>
      <div className="space-x-4">
        <Link href="/hosts">Hosts</Link>
        <Link href="/requests">Requests</Link>
        <Link href="/photos">Photos</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
