"use client";

import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callApi = async () => {
    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await fetch(
        `http://127.0.0.1:8000/api/hello?name=${encodeURIComponent(name)}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error(`Backend returned ${res.status}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError("Failed to reach API: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
      <h1 className="text-2xl font-bold">Fetch Complex JSON from FastAPI</h1>

      {/* TEXT INPUT */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* BUTTON */}
        <button
          onClick={callApi}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {loading ? "Loading..." : "Call API"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* RESPONSE */}
      {data && (
        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            API Response
          </h2>

          <div className="mb-3">
            <p>
              <span className="font-semibold">Message:</span> {data.message}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {data.status}
            </p>
            <p>
              <span className="font-semibold">Timestamp:</span> {data.timestamp}
            </p>
          </div>

          <hr className="my-3" />

          {/* USER */}
          <h3 className="text-lg font-semibold text-gray-700">User Info:</h3>
          <div className="ml-4 mb-3">
            <p>
              <span className="font-semibold">Name:</span> {data.user.name}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {data.user.role}
            </p>
            <p>
              <span className="font-semibold">Active:</span>{" "}
              {data.user.active ? "Yes" : "No"}
            </p>
          </div>

          <hr className="my-3" />

          {/* NUMBERS */}
          <h3 className="text-lg font-semibold text-gray-700">Numbers:</h3>
          <p className="ml-4 mb-3">{data.numbers.join(", ")}</p>

          <hr className="my-3" />

          {/* INFO */}
          <h3 className="text-lg font-semibold text-gray-700">Info:</h3>
          <div className="ml-4">
            <p>
              <span className="font-semibold">Note:</span> {data.info.note}
            </p>
            <p>
              <span className="font-semibold">Version:</span>{" "}
              {data.info.version}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
