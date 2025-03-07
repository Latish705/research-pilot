import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import { RecommendedPapers } from "@/components/dashboard/recommended-papers";
import { TrendingPapers } from "@/components/dashboard/trending-papers";
import { SearchBar } from "@/components/dashboard/search-bar";
import { Chatbot } from "@/components/chatbot";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to ResearchHub</h1>
          <p className="text-muted-foreground">
            Discover, save, and explore research papers tailored to your interests
          </p>
        </div>
        
        <SearchBar />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 space-y-8">
            <RecommendedPapers />
            {/* <TrendingPapers /> */}
          </div>
          
          <div className="space-y-6">
            <DashboardTabs />
          </div>
        </div>
      </main>
      
      <Chatbot />
      
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2025 ResearchHub. All rights reserved.</p>
      </footer>
    </div>
  );
}