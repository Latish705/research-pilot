"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Bookmark, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("explore");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
        <CardDescription>
          Explore research categories or access your saved papers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="explore" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="explore">
              <Compass className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Explore</span>
            </TabsTrigger>
            <TabsTrigger value="bookmarks">
              <Bookmark className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Bookmarks</span>
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Clock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Recent</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="space-y-4 mt-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between rounded-md border p-3 hover:bg-accent">
                <div className="font-medium">Computer Science</div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3 hover:bg-accent">
                <div className="font-medium">Biology</div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3 hover:bg-accent">
                <div className="font-medium">Psychology</div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/explore">View All Categories</Link>
            </Button>
          </TabsContent>
          
          <TabsContent value="bookmarks" className="mt-4">
            <div className="text-center py-6">
              <Bookmark className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No bookmarks yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Save papers to access them quickly later
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setActiveTab("explore")}>
                Explore Papers
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-4">
            <div className="text-center py-6">
              <Clock className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No recent activity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Papers you view will appear here
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setActiveTab("explore")}>
                Start Exploring
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}