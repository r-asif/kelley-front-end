"use client";
import { useEffect, useState } from "react";

export default function HelloClient() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello?name=Iris")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Failed to connect to API"));
  }, []);

  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold">FastAPI says:</h2>
      <p className="mt-2 text-blue-600">{message}</p>
    </div>
  );
}
