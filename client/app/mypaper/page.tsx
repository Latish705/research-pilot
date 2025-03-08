"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";
import { Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

interface Paper {
  _id: string;
  title: string;
  content: string; // HTML content of the paper
  createdAt: string; // Creation date
  updatedAt: string; // Last updated date
}

export default function Home() {
  const [allPapers, setAllPapers] = useState<Paper[]>([]);
  const [sharedPapers, setSharedPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const token = await getCurrentUserToken();
        console.log("Token:", token);

        // Fetch all papers
        const allPapersRes = await axios.get(
          `${BackendUrl}/api/researchPaper/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllPapers(allPapersRes.data);

        // Fetch shared papers
        const sharedPapersRes = await axios.get(
          `${BackendUrl}/api/researchPaper/sharedPapers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Shared papers:", sharedPapersRes.data);
        setSharedPapers(sharedPapersRes.data);
      } catch (error: any) {
        console.error("Error fetching papers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const displayedPapers = activeTab === "all" ? allPapers : sharedPapers;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <DashboardHeader activeTab={""} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📄 My Research Papers</h1>
        <Link href="/paper">
          <Button className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus />
            <span>Create Paper</span>
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <button
          onClick={() => handleTabChange("all")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "all"
              ? "bg-white text-black"
              : "bg-gray-700 text-white"
          }`}
        >
          All Papers
        </button>
        <button
          onClick={() => handleTabChange("shared")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "shared"
              ? "bg-white text-black"
              : "bg-gray-700 text-white"
          }`}
        >
          Shared Papers
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading papers...</p>
      ) : displayedPapers.length === 0 ? (
        <p className="text-gray-400">No papers found. Create one!</p>
      ) : (
        <ul className="space-y-4">
          {displayedPapers.map((paper) => (
            <li
              key={paper._id}
              className="bg-black border border-gray-600 hover:bg-gray-700 p-4 rounded-lg shadow-md transition"
            >
              <Link href={`/paper/${paper._id}`} className="block">
                <h2 className="text-lg font-semibold">{paper.title}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Last updated: {new Date(paper.updatedAt).toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Created at: {new Date(paper.createdAt).toLocaleString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
