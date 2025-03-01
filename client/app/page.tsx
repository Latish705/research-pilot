import { LoginForm } from "@/components/login-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full p-4 flex justify-end">
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">ResearchHub</h1>
            <p className="text-muted-foreground mt-2">
              Your personal research assistant
            </p>
          </div>
          
          <LoginForm />
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 ResearchHub. All rights reserved.</p>
      </footer>
    </div>
  );
}