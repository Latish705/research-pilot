"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, ExternalLink, Send, Loader2 } from "lucide-react";

import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";
import { TypewriterEffect } from "./typewriter-effect";

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
  keywords?: string;
}

export function ResearchChatbot() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.log(res.data);
      setResponse(res.data.response);
      setIsTyping(true);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current && response) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [response, isTyping]);

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex flex-col h-[calc(100vh-3rem)] gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Research Assistant</h1>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-6" ref={chatContainerRef}>
            {!response && !isLoading && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 max-w-md">
                  <h2 className="text-2xl font-bold">
                    Welcome to Research Assistant
                  </h2>
                  <p className="text-muted-foreground">
                    Ask me anything about research topics, and I'll provide you
                    with relevant information and papers.
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Searching for research information...
                  </p>
                </div>
              </div>
            )}

            {response && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 mt-0.5">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">Research Response</h3>
                      <div className="prose prose-sm max-w-none">
                        {isTyping ? (
                          <TypewriterEffect
                            text={response.response}
                            onComplete={() => setIsTyping(false)}
                          />
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: response.response.replace(
                                /\n\n/g,
                                "<br/><br/>"
                              ),
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {response.papers && response.papers.length > 0 && (
                  <div className="bg-muted/40 rounded-lg p-4">
                    <Tabs defaultValue="papers">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Research Sources</h3>
                        <TabsList className="bg-background">
                          <TabsTrigger value="papers">
                            Papers ({response.papers.length})
                          </TabsTrigger>
                          <TabsTrigger
                            value="datasets"
                            disabled={!response.datasets.datasets.length}
                          >
                            Datasets ({response.datasets.datasets.length})
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="papers" className="m-0">
                        <div className="grid gap-3">
                          {response.papers.map((paper, index) => (
                            <div
                              key={index}
                              className="bg-background rounded-md p-3 group"
                            >
                              <div className="flex justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm line-clamp-1">
                                    {paper.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {paper.author.join(", ")}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                  {paper.pdf_Link &&
                                    paper.pdf_Link !== "N/A" && (
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
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="datasets" className="m-0">
                        {response.datasets.datasets.length > 0 ? (
                          <div className="grid gap-3">
                            {response.datasets.datasets.map(
                              (dataset, index) => (
                                <div
                                  key={index}
                                  className="bg-background rounded-md p-3"
                                >
                                  <h4 className="font-medium text-sm">
                                    {dataset.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {dataset.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No datasets available for this query.
                          </p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <Separator />

          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-2">
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
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
