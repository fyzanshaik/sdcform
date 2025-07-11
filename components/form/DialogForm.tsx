"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitApplicationData } from "@/app/actions/application";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { TextScramble } from "@/components/motion-shadcn/scramble-text";

export function ApplicationDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<string[]>([""]);
  const [showDevSuccess, setShowDevSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    // Collect project links
    const projectLinks: string[] = projects.filter(p => p.trim() !== "");

    const applicationData = {
      name: formData.get("name") as string,
      rollNumber: formData.get("rollNumber") as string,
      branch: formData.get("branch") as string,
      yearOfStudy: parseInt(formData.get("yearOfStudy") as string),
      preferredPosition: formData.get("preferredPosition") as string,
      githubProfile: formData.get("githubProfile") as string,
      linkedinProfile: (formData.get("linkedinProfile") as string) || "",
      notes: (formData.get("notes") as string) || "",
      projects: projectLinks,
    };

    try {
      const result = await submitApplicationData(applicationData);

      if (result.success) {
        setShowDevSuccess(true);
        setTimeout(() => {
          setShowDevSuccess(false);
          setOpen(false);
        }, 3200);
        setOpen(false);
        (event.target as HTMLFormElement).reset();
      } else {
        toast.error(result.message);
        if (result.errors) {
          console.error("Validation errors:", result.errors);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="">Apply for Position</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Apply for Developer Club Position</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="Enter your roll number"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="branch">Branch of Engineering *</Label>
                <Select name="branch" required disabled={isSubmitting}>
                  <SelectTrigger className="truncate overflow-hidden whitespace-nowrap max-w-full">
                    <SelectValue
                      placeholder="Choose your branch"
                      className="truncate overflow-hidden whitespace-nowrap max-w-full"
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full max-w-xs sm:max-w-md md:max-w-fit md:w-auto">
                    <SelectItem value="CSE (CSE)">
                      <span className="break-words whitespace-normal block">
                        CSE (CSE)
                      </span>
                    </SelectItem>
                    <SelectItem value="CSE and Artificial Intelligence and Machine Learning (AIML)">
                      <span className="break-words whitespace-normal block">
                        CSE and Artificial Intelligence and Machine Learning
                        (AIML)
                      </span>
                    </SelectItem>
                    <SelectItem value="CSE (Data Science)">
                      <span className="break-words whitespace-normal block">
                        CSE (Data Science)
                      </span>
                    </SelectItem>
                    <SelectItem value="Information Technology (IT)">
                      <span className="break-words whitespace-normal block">
                        Information Technology (IT)
                      </span>
                    </SelectItem>
                    <SelectItem value="Electronics and Communication Engineering (ECE)">
                      <span className="break-words whitespace-normal block">
                        Electronics and Communication Engineering (ECE)
                      </span>
                    </SelectItem>
                    <SelectItem value="Electrical and Electronics Engineering (EEE)">
                      <span className="break-words whitespace-normal block">
                        Electrical and Electronics Engineering (EEE)
                      </span>
                    </SelectItem>
                    <SelectItem value="Mechanical Engineering">
                      <span className="break-words whitespace-normal block">
                        Mechanical Engineering
                      </span>
                    </SelectItem>
                    <SelectItem value="Civil Engineering">
                      <span className="break-words whitespace-normal block">
                        Civil Engineering
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="yearOfStudy">Year of Study *</Label>
                <Select name="yearOfStudy" required disabled={isSubmitting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="preferredPosition">Preferred Position</Label>
                <Select
                  name="preferredPosition"
                  required
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vice President">
                      Vice President
                    </SelectItem>
                    <SelectItem value="Secretary">Secretary</SelectItem>
                    <SelectItem value="Club Member">Club Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="githubProfile">GitHub Profile *</Label>
                <Input
                  id="githubProfile"
                  name="githubProfile"
                  type="url"
                  placeholder="https://github.com/yourusername"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                <Input
                  id="linkedinProfile"
                  name="linkedinProfile"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile (optional)"
                  disabled={isSubmitting}
                />
              </div>

              {/* Showcase Projects */}
              <div className="grid gap-2">
                <Label>Show off your projects here</Label>
                <div className="flex flex-col gap-2">
                  {projects.map((project, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        type="url"
                        name={`project-${idx}`}
                        placeholder="https://your-cool-project.vercel.app"
                        value={project}
                        onChange={e => {
                          const newProjects = [...projects];
                          newProjects[idx] = e.target.value;
                          setProjects(newProjects);
                        }}
                        className="flex-1 min-w-0"
                        pattern="https?://.+"
                        title="Please enter a valid URL starting with http(s)://"
                        disabled={isSubmitting}
                        // No required field for projects, all optional
                      />
                      {projects.length > 1 && (
                        <button
                          type="button"
                          aria-label="Remove project"
                          onClick={() =>
                            setProjects(projects.filter((_, i) => i !== idx))
                          }
                          className="p-2 rounded hover:bg-destructive/10 text-destructive transition-colors"
                          tabIndex={0}
                          disabled={isSubmitting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setProjects([...projects, ""])}
                    className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium self-start mt-1"
                    disabled={isSubmitting || projects.length >= 5}
                  >
                    <Plus className="w-4 h-4" /> Add another project
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Share deployed links to your best projects! (max 5)
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Tell us anything else you'd like us to know..."
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting} className="">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {showDevSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-xs sm:max-w-md">
            <span className="text-green-400 text-3xl">&#10003;</span>
            <TextScramble
              className="text-lg sm:text-2xl font-mono text-green-400 text-center"
              duration={1.2}
              speed={0.03}
            >
              Application Submitted!
            </TextScramble>
            <TextScramble
              className="text-xs sm:text-base font-mono text-zinc-200 text-center"
              duration={1.5}
              speed={0.04}
            >
              Welcome to the Club, Developer!
            </TextScramble>
            <div className="mt-2 text-xs text-zinc-400 text-center">
              <span>{`{ status: "success" }`}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
