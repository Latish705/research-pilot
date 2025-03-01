"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for papers, authors, or topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
        
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filters</h4>
                <p className="text-sm text-muted-foreground">
                  Refine your search results
                </p>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="date">Date</Label>
                  <Select defaultValue="any">
                    <SelectTrigger id="date" className="col-span-2 h-8">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any time</SelectItem>
                      <SelectItem value="day">Past 24 hours</SelectItem>
                      <SelectItem value="week">Past week</SelectItem>
                      <SelectItem value="month">Past month</SelectItem>
                      <SelectItem value="year">Past year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="field">Field</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="field" className="col-span-2 h-8">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All fields</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="bio">Biology</SelectItem>
                      <SelectItem value="psych">Psychology</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chem">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="sort">Sort by</Label>
                  <Select defaultValue="relevance">
                    <SelectTrigger id="sort" className="col-span-2 h-8">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="date">Date (newest)</SelectItem>
                      <SelectItem value="citations">Citations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button type="submit">Search</Button>
      </div>
      
      {query && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-md border bg-background shadow-md">
          <div className="p-2">
            <p className="text-xs text-muted-foreground">Suggestions</p>
            <div className="mt-2 space-y-1">
              <div className="cursor-pointer rounded-md p-2 text-sm hover:bg-accent">
                Machine Learning in Healthcare
              </div>
              <div className="cursor-pointer rounded-md p-2 text-sm hover:bg-accent">
                Machine Learning Algorithms
              </div>
              <div className="cursor-pointer rounded-md p-2 text-sm hover:bg-accent">
                Deep Learning Applications
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}