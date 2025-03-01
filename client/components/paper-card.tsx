"use client";

import { useState } from "react";
import Image from "next/image";
import { Bookmark, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface Paper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  abstract: string;
  keywords: string[];
  imageUrl: string;
}

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "The paper has been removed from your bookmarks" 
        : "The paper has been added to your bookmarks",
    });
  };
  
  const handleShare = () => {
    // In a real app, this would copy a link to the clipboard or open a share dialog
    toast({
      title: "Share link copied",
      description: "The link has been copied to your clipboard",
    });
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-48 md:h-auto md:w-1/4 md:min-h-[180px]">
            <Image
              src={paper.imageUrl}
              alt={paper.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary cursor-pointer">
                  {paper.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {paper.authors} • {paper.journal} • {paper.year}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleBookmark}
                        className={isBookmarked ? "text-primary" : ""}
                      >
                        <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share paper</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="mt-2">
              <p className={`text-sm ${isExpanded ? "" : "line-clamp-2"}`}>
                {paper.abstract}
              </p>
              {paper.abstract.length > 150 && (
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-xs mt-1" 
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less" : "Show more"}
                </Button>
              )}
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {paper.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Paper
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}