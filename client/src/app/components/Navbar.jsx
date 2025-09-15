"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout(); // ✅ Context state update
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <Link href="/" className="text-xl font-bold">
        Travelfree
      </Link>
      <div className="space-x-4">
        <Link href="/hosts">Hosts</Link>
        <Link href="/photos">Photos</Link>

        {isLoggedIn ? (
          <>
            <Link href="/requests">Requests</Link>
            <Link href="/profile">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
