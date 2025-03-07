"use client";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TopicIdPage() {
  const { topic } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageOnTopic = async () => {
      try {
        const token = await getCurrentUserToken();
        const res = await axios.get(
          `${BackendUrl}/api/user/getPaperOnTopic/${topic}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("res:", res.data);
        setData(res.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPageOnTopic();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  if (!data) return null;
  // @ts-ignore
  const { papers, keywords } = data.response;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        Recommended Papers on {keywords.replace("_", " ")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {papers.map((paper: string, index: string) => (
          <Card key={index} className="border rounded-lg shadow-lg p-4">
            <CardHeader>
              <CardTitle className="text-lg font-bold mb-2">
                {
                  // @ts-ignore
                  paper.title
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Authors:{" "}
                {
                  // @ts-ignore

                  paper.author.join(", ")
                }
              </p>
              {paper.link && (
                <Button
                  variant="link"
                  className="text-blue-500"
                  as="a"
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Paper
                </Button>
              )}
              {
                //@ts-ignore
                paper.pdf_Link !== "N/A" && (
                  <Button
                    variant="link"
                    className="text-blue-500"
                    as="a"
                    href={paper.pdf_Link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </Button>
                )
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
