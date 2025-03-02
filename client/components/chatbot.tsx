"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const navigation = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your research assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const toggleOpen = () => {
    navigation.push("/chatbot");
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";

      if (
        input.toLowerCase().includes("find") ||
        input.toLowerCase().includes("search")
      ) {
        botResponse =
          "To search for papers, you can use the search bar at the top of the dashboard. You can filter results by date, field, and more.";
      } else if (
        input.toLowerCase().includes("bookmark") ||
        input.toLowerCase().includes("save")
      ) {
        botResponse =
          "You can bookmark papers by clicking the bookmark icon on any paper card. Your bookmarks will appear in the Bookmarks tab.";
      } else if (input.toLowerCase().includes("download")) {
        botResponse =
          "To download a paper, click the 'View Paper' button on the paper card, then look for the download option on the paper details page.";
      } else if (
        input.toLowerCase().includes("hello") ||
        input.toLowerCase().includes("hi")
      ) {
        botResponse =
          "Hello! I'm here to help you navigate ResearchHub. What would you like to know?";
      } else {
        botResponse =
          "I'm here to help you with ResearchHub. You can ask me about finding papers, using features, or navigating the platform.";
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <Button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 rounded-full h-12 w-12 shadow-lg"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageSquare className="h-5 w-5" />
        )}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 right-6 w-80 bg-background border rounded-lg shadow-lg transition-all duration-200 ease-in-out overflow-hidden",
            isMinimized ? "h-14" : "h-96"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/bot-avatar.png" alt="Chatbot" />
                <AvatarFallback>RH</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Research Assistant</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMinimize}>
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <ScrollArea className="h-[calc(100%-7rem)] p-3">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-3 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
