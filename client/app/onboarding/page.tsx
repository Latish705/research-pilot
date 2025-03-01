"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().optional(),
  researchDomain: z.string().min(1, { message: "Please select a research domain" }),
  currentPosition: z.string().min(1, { message: "Please select your current position" }),
  institution: z.string().min(2, { message: "Please enter your institution" }),
  yearsExperience: z.string().min(1, { message: "Please select your experience" }),
  pastResearch: z.string().optional(),
  interests: z.string().min(3, { message: "Please enter at least one research interest" }),
});

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
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      researchDomain: "",
      currentPosition: "",
      institution: "",
      yearsExperience: "",
      pastResearch: "",
      interests: "",
    },
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  function nextStep() {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Profile created successfully!",
        description: "Redirecting to your dashboard...",
      });
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }, 1500);
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
            <h1 className="text-3xl font-bold tracking-tight">Complete Your Profile</h1>
            <p className="text-muted-foreground mt-2">
              Tell us about yourself so we can personalize your experience
            </p>
            
            <div className="mt-6">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Basic Details</h2>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll only use this to contact you about your account
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Professional Background</h2>
                  
                  <FormField
                    control={form.control}
                    name="researchDomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Research Domain/Field</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your research domain" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {researchDomains.map((domain) => (
                              <SelectItem key={domain} value={domain}>
                                {domain}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currentPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Position</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your current position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position} value={position}>
                                {position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution/Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="University of Example" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Experience & Interests</h2>
                  
                  <FormField
                    control={form.control}
                    name="yearsExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Research Experience</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceYears.map((years) => (
                              <SelectItem key={years} value={years}>
                                {years}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pastResearch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Past Research Work (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe your past research work and publications..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Research Interests</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="AI, Quantum Mechanics, Behavioral Science, etc. (comma separated)" 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter topics or keywords related to your research interests
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <div className="flex justify-between pt-4">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
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
                  <Button type="submit" disabled={isSubmitting}>
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
          </Form>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 ResearchHub. All rights reserved.</p>
      </footer>
    </div>
  );
}