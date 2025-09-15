"use client";
import { useState, useEffect } from "react";

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/photos/all")
      .then((res) => res.json())
      .then(setPhotos);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Community Photos</h1>
      <div className="grid grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo._id} className="border rounded p-2">
            <img src={photo.image} alt="Travel" className="w-full h-40 object-cover" />
            <p className="mt-2 text-center">{photo.user?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
