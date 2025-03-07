"use client";
import EditorId from "@/components/editor/EditorId";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PaperIdPage() {
  const { id }: { id: string } = useParams();
  const [paper, setPaper] = useState(null); // State to hold paper data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    const getPaper = async () => {
      try {
        const token = await getCurrentUserToken();
        console.log("Token:", token);
        const res = await axios.get(`${BackendUrl}/api/researchPaper/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Paper:", res.data);
        setPaper(res.data); // Update state with fetched paper data
      } catch (error: any) {
        console.error("Error fetching paper:", error);
        setError("Failed to fetch the paper. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPaper();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading paper...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      {paper && (
        <EditorId paperId={id} title={paper.title} content={paper.content} />
      )}
    </div>
  );
}
