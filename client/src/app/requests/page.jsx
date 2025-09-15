"use client";
import { useState, useEffect } from "react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests") // make sure backend route exists
      .then((res) => res.json())
      .then(setRequests);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Requests</h1>
      {requests.map((req) => (
        <div key={req._id} className="border p-3 mb-2">
          <p><strong>Status:</strong> {req.status}</p>
          <p><strong>Host:</strong> {req.host?.name}</p>
        </div>
      ))}
    </div>
  );
}
