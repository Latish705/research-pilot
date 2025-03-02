import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaperCard } from "@/components/paper-card";



// Mock data for trending papers
const trendingPapers = [
  {
    id: "4",
    title: "The Future of Sustainable Energy: Breakthroughs in Solar Technology",
    authors: "Thomas Wilson, Lisa Garcia",
    journal: "Renewable Energy",
    year: "2025",
    abstract: "This paper discusses recent breakthroughs in solar cell technology, including perovskite-based cells and their potential for revolutionizing renewable energy production.",
    keywords: ["Solar Energy", "Renewable Energy", "Perovskite"],
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "5",
    title: "Neuroplasticity and Learning: New Insights from Cognitive Neuroscience",
    authors: "Amanda Brown, James Taylor",
    journal: "Neuroscience & Biobehavioral Reviews",
    year: "2024",
    abstract: "This review synthesizes recent findings on neuroplasticity and its implications for learning and education, with a focus on practical applications.",
    keywords: ["Neuroplasticity", "Learning", "Cognitive Neuroscience"],
    imageUrl: "https://images.unsplash.com/photo-1559757175-7cb056fba93d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhaW58ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "6",
    title: "Ethical Considerations in Artificial Intelligence Development",
    authors: "Daniel Rodriguez, Sophia Patel",
    journal: "Ethics in Information Technology",
    year: "2025",
    abstract: "This paper examines the ethical challenges associated with AI development and deployment, proposing a framework for responsible innovation.",
    keywords: ["AI Ethics", "Responsible AI", "Technology Ethics"],
    imageUrl: "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWklMjByb2JvdHxlbnwwfHwwfHx8MA%3D%3D"
  }
];

export function TrendingPapers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Papers</CardTitle>
        <CardDescription>
          Most-read papers in the research community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {trendingPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}