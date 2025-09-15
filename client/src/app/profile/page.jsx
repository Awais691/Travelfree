"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // ✅ Redirect if no token
      return;
    }

    // ✅ Fetch user profile from backend
    fetch("http://localhost:5000/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token"); // Invalid token remove
        router.push("/login");
      });
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      {user ? (
        <div className="mt-4 bg-white shadow-md p-6 rounded-lg">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">Loading profile...</p>
      )}
    </div>
  );
}
