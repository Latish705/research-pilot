"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";
import { Plus } from "lucide-react";

interface Paper {
  _id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [papers, setPapers] = useState<Paper[]>([
    {
      _id: "1",
      title: "AI in Healthcare",
      description: "Exploring the applications of AI in modern medicine.",
    },
    {
      _id: "2",
      title: "Quantum Computing Breakthroughs",
      description: "Latest advancements in quantum algorithms and hardware.",
    },
    {
      _id: "3",
      title: "Climate Change and AI",
      description: "Using AI to model and mitigate climate change effects.",
    },
  ]);
  const [loading, setLoading] = useState(false); // No need to load since we have dummy data

  useEffect(() => {
    const getPapers = async () => {
      try {
        const token = await getCurrentUserToken();
        console.log("Token:", token);
        const res = await axios.get(`${BackendUrl}/api/researchPaper/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Papers:", res.data);
        setPapers(res.data);
      } catch (error: any) {
        console.log("Error fetching papers:", error);
      }
    };

    // Commented out actual API call to always show dummy data
    // getPapers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📄 My Research Papers</h1>
        <Link href="/paper">
          <Button className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus />
            <span>Create Paper</span>
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading papers...</p>
      ) : papers.length === 0 ? (
        <p className="text-gray-400">No papers found. Create one!</p>
      ) : (
        <ul className="space-y-4">
          {papers.map((paper) => (
            <li key={paper._id} className="bg-black border border-gray-600 hover:bg-gray-700 p-4 rounded-lg shadow-md transition">
              <Link href={`/paper/${paper._id}`} className="block">
                <h2 className="text-lg font-semibold">{paper.title}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {paper.description || "No description available."}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
