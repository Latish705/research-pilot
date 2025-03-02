"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, FileText, ExternalLink } from "lucide-react";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";

interface Paper {
  title: string;
  author: string[];
  link: string;
  pdf_Link: string;
}

interface Dataset {
  datasets: any[];
}

interface ChatResponse {
  response: string;
  papers: Paper[];
  datasets: Dataset;
}

export default function Field() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getDetails = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);

    try {
      const token = await getCurrentUserToken();
      const res = await axios.post(
        `${BackendUrl}/api/user/chatbot`,
        { query },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current && response) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [response]);

  return (
    
    <div className="container mx-auto py-6 max-w-5xl">
      <Card className="flex flex-col h-[calc(100vh-3rem)] overflow-hidden">
        <ScrollArea className="flex-1 p-6" ref={chatContainerRef}>
          {!response && !isLoading && (
            <div className="h-full flex items-center justify-center text-center">
              <p className="text-muted-foreground">
                Enter a research query to get started.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {response && (
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-md">
                <p>{response.response}</p>
              </div>

              {response.papers?.length > 0 && (
                <div className="bg-muted/40 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Research Papers</h3>
                  <div className="grid gap-3">
                    {response.papers.map((paper, index) => (
                      <div key={index} className="bg-background rounded-md p-3">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {paper.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {paper.author.join(", ")}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {paper.link && paper.link !== "N/A" && (
                            <a
                              href={paper.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          {paper.pdf_Link && paper.pdf_Link !== "N/A" && (
                            <a
                              href={paper.pdf_Link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            getDetails();
          }}
          className="p-4 flex gap-2"
        >
          <Input
            placeholder="Ask a research question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !query.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
