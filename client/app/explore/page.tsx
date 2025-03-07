import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SearchBar } from "@/components/dashboard/search-bar";
import { Chatbot } from "@/components/chatbot";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Mock data for research categories
const categories = [
  {
    id: "Computer_Science",
    name: "Computer Science",
    description: "AI, Machine Learning, Data Science, Algorithms",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXIlMjBzY2llbmNlfGVufDB8fDB8fHww",
    paperCount: 12453,
  },
  {
    id: "Biology",
    name: "Biology",
    description: "Molecular Biology, Genetics, Ecology, Evolution",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlvbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    paperCount: 9872,
  },
  {
    id: "Psychology",
    name: "Psychology",
    description: "Cognitive Psychology, Clinical Psychology, Neuroscience",
    imageUrl:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHN5Y2hvbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    paperCount: 7654,
  },
  {
    id: "Physics",
    name: "Physics",
    description: "Quantum Physics, Astrophysics, Particle Physics",
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVhbnR1bXxlbnwwfHwwfHx8MA%3D%3D",
    paperCount: 8765,
  },
  {
    id: "Chemistry",
    name: "Chemistry",
    description: "Organic Chemistry, Inorganic Chemistry, Biochemistry",
    imageUrl:
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlbWlzdHJ5fGVufDB8fDB8fHww",
    paperCount: 6543,
  },
  {
    id: "Mathematics",
    name: "Mathematics",
    description: "Algebra, Calculus, Statistics, Number Theory",
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWF0aGVtYXRpY3N8ZW58MHx8MHx8fDA%3D",
    paperCount: 5432,
  },
  {
    id: "Medicine",
    name: "Medicine",
    description: "Clinical Medicine, Public Health, Epidemiology",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
    paperCount: 10987,
  },
  {
    id: "Economics",
    name: "Economics",
    description: "Microeconomics, Macroeconomics, Econometrics",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbm9taWNzfGVufDB8fDB8fHww",
    paperCount: 4321,
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Explore Research Categories
          </h1>
          <p className="text-muted-foreground">
            Browse research papers by category or search for specific topics
          </p>
        </div>

        <SearchBar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {categories.map((category) => (
            <Link href={`/explore/${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div className="relative h-48">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-muted-foreground">
                      {category.paperCount.toLocaleString()} papers
                    </span>
                    <Button variant="ghost" size="sm">
                      Browse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Chatbot />

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© 2025 ResearchHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
