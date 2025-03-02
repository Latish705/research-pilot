"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { getCurrentUserToken } from "@/utils/firebase";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: any }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const renderResponse = (data: any) => {
    const { response, papers, datasets, keywords } = data;

    return (
      <div>
        <p>{response}</p>

        {papers?.length > 0 && (
          <div>
            <h3 className="font-bold mt-4">Related Papers:</h3>
            <ul className="list-disc pl-4">
              {papers.map((paper: any, index: number) => (
                <li key={index}>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {paper.title}
                  </a>{" "}
                  by {paper.author.join(", ")}
                  {paper.pdf_Link && (
                    <a
                      href={paper.pdf_Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-green-500 underline"
                    >
                      [PDF]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {datasets?.datasets?.length > 0 && (
          <div>
            <h3 className="font-bold mt-4">Related Datasets:</h3>
            <ul className="list-disc pl-4">
              {datasets.datasets.map((dataset: any, index: number) => (
                <li key={index}>
                  {dataset.title} ({dataset.size}) -{" "}
                  <a
                    href={`https://www.kaggle.com/datasets/${dataset.ref}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Dataset
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {keywords && (
          <div>
            <h3 className="font-bold mt-4">Keywords:</h3>
            <p>{keywords}</p>
          </div>
        )}
      </div>
    );
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = await getCurrentUserToken();
      const res = await axios.post(
        `${BackendUrl}/api/user/chatbot`,
        { query: input },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data.response);
      const responseMessage = {
        role: "bot",
        content: renderResponse(res.data),
      };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "An error occurred while fetching data." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <Card className="flex-1 overflow-y-auto p-4 mb-4 space-y-4 bg-black">
        <CardContent>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl p-3 max-w-sm text-white ${
                  message.role === "user" ? "bg-blue-500" : "bg-gray-500"
                }`}
              >
                {typeof message.content === "string"
                  ? message.content
                  : message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl p-3 bg-gray-500 max-w-sm text-white">
                <Loader className="animate-spin" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          Send
        </Button>
      </div>
    </div>
  );
}
