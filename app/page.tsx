import HelloClient from "./hello-client";

export default async function Page() {
  const res = await fetch("http://localhost:8000/api/hello?name=Iris", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Server-Fetched Response</h1>
      <p className="text-blue-600">{data.message}</p>
    </main>
  );
}
