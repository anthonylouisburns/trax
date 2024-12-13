"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div><Link href="/conversations" className="hover:underline hover:text-blue-600">conversations</Link></div>
      <div><Link href="/outputfiles" className="hover:underline hover:text-blue-600">files</Link></div>
    </main>
  );
}
