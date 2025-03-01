import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaperCard } from "@/components/paper-card";

// Mock data for recommended papers
const recommendedPapers = [
  {
    id: "1",
    title: "Advances in Deep Learning for Natural Language Processing",
    authors: "Sarah Johnson, Michael Chen",
    journal: "Journal of Artificial Intelligence Research",
    year: "2025",
    abstract: "This paper explores recent advances in deep learning techniques for natural language processing tasks, including transformer architectures and their applications.",
    keywords: ["Deep Learning", "NLP", "Transformers"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "2",
    title: "Quantum Computing: Current State and Future Directions",
    authors: "David Lee, Emily Wang",
    journal: "Quantum Information Processing",
    year: "2024",
    abstract: "A comprehensive review of the current state of quantum computing, including recent experimental achievements and theoretical advances.",
    keywords: ["Quantum Computing", "Quantum Information", "Qubits"],
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVhbnR1bXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "3",
    title: "Climate Change Impacts on Biodiversity: A Meta-Analysis",
    authors: "Jennifer Martinez, Robert Kim",
    journal: "Environmental Science & Technology",
    year: "2025",
    abstract: "This meta-analysis examines the impacts of climate change on global biodiversity, synthesizing data from over 500 studies across different ecosystems.",
    keywords: ["Climate Change", "Biodiversity", "Meta-Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww"
  }
];

export function RecommendedPapers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
        <CardDescription>
          Papers based on your research interests and profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {recommendedPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}