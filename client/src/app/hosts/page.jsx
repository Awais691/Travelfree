"use client";
import { useEffect, useState } from "react";

export default function HostsPage() {
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/accommodations/all")
      .then((res) => res.json())
      .then(setHosts);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Hosts</h1>
      <div className="grid grid-cols-3 gap-4">
        {hosts.map((host) => (
          <div key={host._id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{host.title}</h2>
            <p>{host.description}</p>
            <p><strong>Room:</strong> {host.roomType}</p>
            <button className="bg-green-600 text-white px-3 py-1 mt-2 rounded">
              Send Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
