"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";

interface Paper {
  _id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

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

    getPapers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📄 My Research Papers</h1>
        <Link href="/paper">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            ➕ Create Paper
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading papers...</p>
      ) : papers.length === 0 ? (
        <p className="text-gray-400">No papers found. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <Link
              key={paper._id}
              href={`/paper/${paper._id}`}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{paper.title}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {paper.description || "No description available."}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
