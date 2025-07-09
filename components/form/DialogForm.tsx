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
import { Loader2 } from "lucide-react";

export function ApplicationDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    
    const applicationData = {
      name: formData.get("name") as string,
      rollNumber: formData.get("rollNumber") as string,
      branch: formData.get("branch") as string,
      yearOfStudy: parseInt(formData.get("yearOfStudy") as string),
      preferredPosition: formData.get("preferredPosition") as string,
      githubProfile: formData.get("githubProfile") as string,
      linkedinProfile: formData.get("linkedinProfile") as string || "",
      notes: formData.get("notes") as string || "",
    };

    try {
      const result = await submitApplicationData(applicationData);
      
      if (result.success) {
        toast.success(result.message);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="">
          Apply for Position
        </Button>
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
              <Input
                id="branch"
                name="branch"
                placeholder="e.g., Computer Science, Electronics"
                required
                disabled={isSubmitting}
              />
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
              <Select name="preferredPosition" required disabled={isSubmitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vice President">Vice President</SelectItem>
                  <SelectItem value="Secretary">Secretary</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
              <Button 
                type="button" 
                variant="outline"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className=""
            >
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
  );
}