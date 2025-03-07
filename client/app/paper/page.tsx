import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import Editor from "@/components/editor/editor";

export default function PaperPage() {
  return (
    <div className="min-h-screen h-screen bg-background">
      <DashboardHeader />
      <Editor />
    </div>
  );
}
