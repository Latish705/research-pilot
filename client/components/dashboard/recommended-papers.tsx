"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaperCard } from "@/components/paper-card";

export function RecommendedPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/getRecommendedTopics");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.success && Array.isArray(data.response.papers)) {
          setPapers(data.response.papers);
        } else {
          throw new Error("Invalid response format or no papers available");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  if (loading) return <div>Loading recommended papers...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
        <CardDescription>Papers based on your research interests and profile</CardDescription>
      </CardHeader>
      <CardContent>
        {papers.length > 0 ? (
          <div className="grid gap-4">
            {papers.map((paper, index) => (
              <PaperCard key={index} paper={paper} />
            ))}
          </div>
        ) : (
          <div>No recommended papers found.</div>
        )}
      </CardContent>
    </Card>
  );
}