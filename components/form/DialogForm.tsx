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
import { useRef } from "react";

export function ApplicationDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState<string[]>([""]);
  const [showDevSuccess, setShowDevSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const firstErrorRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const projectLinks: string[] = projects.filter(p => p.trim() !== "");

    // --- Client-side required field validation ---
    const requiredFields = [
      { name: "name", label: "Full Name" },
      { name: "rollNumber", label: "Roll Number" },
      { name: "branch", label: "Branch of Engineering" },
      { name: "yearOfStudy", label: "Year of Study" },
      { name: "preferredPosition", label: "Preferred Position" },
      { name: "githubProfile", label: "GitHub Profile" },
    ];
    const newFieldErrors: Record<string, string> = {};
    requiredFields.forEach(field => {
      const value = formData.get(field.name);
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newFieldErrors[field.name] = `${field.label} is required`;
      }
    });
    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setTimeout(() => {
        if (firstErrorRef.current) {
          firstErrorRef.current.focus();
        }
      }, 0);
      setIsSubmitting(false);
      return;
    }
    // --- End client-side required validation ---

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
        setProjects([""]);
      } else if (result.errors && Array.isArray(result.errors)) {
        // Zod error format: [{ path: [field], message: "..." }, ...]
        const errors: Record<string, string> = {};
        result.errors.forEach((err: any) => {
          if (Array.isArray(err.path) && err.path.length > 0) {
            errors[err.path[0]] = err.message;
          }
        });
        setFieldErrors(errors);
        // Focus first error field
        setTimeout(() => {
          if (firstErrorRef.current) {
            firstErrorRef.current.focus();
          }
        }, 0);
      } else {
        toast.error(result.message || "Please check your form data");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper to get error and ref for each field
  const getFieldProps = (
    name: string,
    type: "input" | "select" | "textarea" = "input"
  ) => {
    const error = fieldErrors[name];
    const props: any = {
      "aria-invalid": !!error,
      "aria-describedby": error ? `${name}-error` : undefined,
      className: error
        ? "border-destructive focus-visible:ring-destructive"
        : undefined,
    };
    // Only attach ref for input fields
    if (type === "input" && error && !firstErrorRef.current) {
      props.ref = firstErrorRef;
    }
    return props;
  };

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
            <div className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">*</span> means
              required field
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  {...getFieldProps("name", "input")}
                />
                {fieldErrors.name && (
                  <p className="text-destructive text-sm mt-1" id="name-error">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="Enter your roll number"
                  disabled={isSubmitting}
                  {...getFieldProps("rollNumber", "input")}
                />
                {fieldErrors.rollNumber && (
                  <p
                    className="text-destructive text-sm mt-1"
                    id="rollNumber-error"
                  >
                    {fieldErrors.rollNumber}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="branch">Branch of Engineering *</Label>
                <Select
                  name="branch"
                  disabled={isSubmitting}
                  {...getFieldProps("branch")}
                >
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
                <Select
                  name="yearOfStudy"
                  disabled={isSubmitting}
                  {...getFieldProps("yearOfStudy")}
                >
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
                <Label htmlFor="preferredPosition">Preferred Position *</Label>
                <Select
                  name="preferredPosition"
                  disabled={isSubmitting}
                  {...getFieldProps("preferredPosition", "select")}
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
                  disabled={isSubmitting}
                  {...getFieldProps("githubProfile", "input")}
                />
                {fieldErrors.githubProfile && (
                  <p
                    className="text-destructive text-sm mt-1"
                    id="githubProfile-error"
                  >
                    {fieldErrors.githubProfile}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="linkedinProfile">
                  LinkedIn Profile{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="linkedinProfile"
                  name="linkedinProfile"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile (optional)"
                  disabled={isSubmitting}
                  {...getFieldProps("linkedinProfile", "input")}
                />
                {fieldErrors.linkedinProfile && (
                  <p
                    className="text-destructive text-sm mt-1"
                    id="linkedinProfile-error"
                  >
                    {fieldErrors.linkedinProfile}
                  </p>
                )}
              </div>

              {/* Showcase Projects */}
              <div className="grid gap-2">
                <Label>
                  Show off your projects here{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
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
                        className={[
                          "flex-1 min-w-0",
                          fieldErrors[`projects.${idx}`]
                            ? "border-destructive focus-visible:ring-destructive"
                            : "",
                        ].join(" ")}
                        pattern="https?://.+"
                        title="Please enter a valid URL starting with http(s)://"
                        disabled={isSubmitting}
                        // No required field for projects, all optional
                        aria-invalid={!!fieldErrors[`projects.${idx}`]}
                        aria-describedby={
                          fieldErrors[`projects.${idx}`]
                            ? `projects-${idx}-error`
                            : undefined
                        }
                        // ref not needed for dynamic project fields
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
                      {fieldErrors[`projects.${idx}`] && (
                        <p
                          className="text-destructive text-sm mt-1"
                          id={`projects-${idx}-error`}
                        >
                          {fieldErrors[`projects.${idx}`]}
                        </p>
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
                <Label htmlFor="notes">
                  Additional Notes{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Tell us anything else you'd like us to know..."
                  rows={3}
                  disabled={isSubmitting}
                  {...getFieldProps("notes", "textarea")}
                />
                {fieldErrors.notes && (
                  <p className="text-destructive text-sm mt-1" id="notes-error">
                    {fieldErrors.notes}
                  </p>
                )}
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
