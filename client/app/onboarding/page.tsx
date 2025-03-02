"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCurrentUserToken } from "@/utils/firebase";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";

const researchDomains = [
  "Computer Science",
  "Biology",
  "Psychology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Medicine",
  "Economics",
  "Engineering",
  "Social Sciences",
  "Arts & Humanities",
  "Environmental Science",
  "Other",
];

const positions = [
  "Student (Undergraduate)",
  "Student (Graduate)",
  "PhD Candidate",
  "Postdoctoral Researcher",
  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "Research Scientist",
  "Industry Researcher",
  "Independent Researcher",
  "Other",
];

const experienceYears = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

export default function OnboardingPage() {
  const navigation = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    researchDomain: "",
    currentPosition: "",
    institution: "",
    yearsExperience: "",
    pastResearch: "",
    interests: "",
  });
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  function nextStep() {
    if (step < totalSteps) setStep(step + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = await getCurrentUserToken();
      if (!token) throw new Error("User token not found. Please log in again.");

      const payload = {
        fullname: formData.fullName,
        mobileNo: formData.phoneNumber || null,
        researchDomain: formData.researchDomain,
        currentPos: formData.currentPosition,
        organization: formData.institution,
        yearsOfResearchExp: formData.yearsExperience,
        pastResearchWork: formData.pastResearch || null,
        researchInterests: formData.interests
          .split(",")
          .map((interest) => interest.trim()),
      };

      const response = await axios.post(
        `${BackendUrl}/api/user/signup`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Profile created successfully!",
          description: "You will be redirected to the dashboard shortly.",
          variant: "default",
        });
        navigation.push("/dashboard");
      }
      toast({
        title: "Error",
        description: response.data.message || "Failed to submit profile.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("API Error:", error);
      toast({
        title: "Error",
        description: "Failed to submit profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-primary mr-2" />
          <span className="font-semibold text-lg">ResearchHub</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground mt-2">
              Tell us about yourself so we can personalize your experience
            </p>

            <div className="mt-6">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>
                  Step {step} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Details</h2>

                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Phone Number (Optional)
                  </label>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Professional Background
                </h2>

                <div>
                  <label className="block text-sm font-medium">
                    Research Domain/Field
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("researchDomain", value)
                    }
                    defaultValue={formData.researchDomain}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your research domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {researchDomains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Current Position
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("currentPosition", value)
                    }
                    defaultValue={formData.currentPosition}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Institution/Organization
                  </label>
                  <Input
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    placeholder="University of Example"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Experience & Interests
                </h2>

                <div>
                  <label className="block text-sm font-medium">
                    Years of Research Experience
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("yearsExperience", value)
                    }
                    defaultValue={formData.yearsExperience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceYears.map((years) => (
                        <SelectItem key={years} value={years}>
                          {years}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Past Research Work (Optional)
                  </label>
                  <Textarea
                    name="pastResearch"
                    value={formData.pastResearch}
                    onChange={handleChange}
                    placeholder="Briefly describe your past research work and publications..."
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Research Interests
                  </label>
                  <Textarea
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    required
                    placeholder="AI, Quantum Mechanics, Behavioral Science, etc. (comma separated)"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              ) : (
                <div></div>
              )}

              {step < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Complete Profile"
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 ResearchHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
