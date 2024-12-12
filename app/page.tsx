"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const conversations = useQuery(api.conversations.get);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {conversations?.map(({ _id, when, company, person, desc }) =>
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-5" key={_id}>
          <div className="text-xl font-medium text-green">{company}:{when}:{person}:{desc}</div>
        </div>
      )}
    </main>
  );
}
