"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Bell, User, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "@/utils/firebase";
import { useRouter } from "next/navigation";

export function DashboardHeader({ activeTab }: { activeTab: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden md:inline-block">
              ResearchHub
            </span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium  transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/explore"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Explore
            </Link>
            <Link
              href="/bookmarks"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Bookmarks
            </Link>
            <Link
              href="/mypaper"
              className="text-sm font-medium  transition-colors hover:text-primary"
            >
              My Papers
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">ResearchHub</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col gap-4 py-6">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/explore"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Explore
                  </Link>
                  <Link
                    href="/bookmarks"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Bookmarks
                  </Link>
                  <Link
                    href="/mypaper"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    My Paper
                  </Link>
                </nav>

                <div className="mt-auto flex flex-col gap-4 py-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
