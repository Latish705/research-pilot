import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SearchBar } from "@/components/dashboard/search-bar";
import { Chatbot } from "@/components/chatbot";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import Link from "next/link";

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader activeTab={""} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Bookmarks</h1>
          <p className="text-muted-foreground">
            Access your saved research papers
          </p>
        </div>
        
        <SearchBar />
        
        <div className="mt-12 text-center py-12">
          <Bookmark className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">No bookmarks yet</h2>
          
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            You havent bookmarked any research papers yet. Browse papers and click the bookmark icon to save them for later.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/dashboard">Explore Papers</Link>
          </Button>
        </div>
      </main>
      
      <Chatbot />
      
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2025 ResearchHub. All rights reserved.</p>
      </footer>
    </div>
  );
}