import { z } from "zod";

export const applicationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),

  rollNumber: z
    .string()
    .min(1, "Roll number is required")
    .max(20, "Roll number must be less than 20 characters"),

  branch: z
    .string()
    .min(1, "Branch is required")
    .max(100, "Branch must be less than 100 characters"),

  yearOfStudy: z
    .number()
    .int("Year must be a whole number")
    .min(1, "Year must be between 1 and 4")
    .max(4, "Year must be between 1 and 4"),

  preferredPosition: z
    .string()
    .min(1, "Preferred position is required")
    .max(50, "Position must be less than 50 characters"),

  githubProfile: z
    .string()
    .url("Please enter a valid GitHub URL")
    .regex(
      /^https:\/\/github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/,
      "Please enter a valid GitHub profile URL"
    )
    .optional()
    .or(z.literal("")),

  linkedinProfile: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .regex(
      /^https:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
      "Please enter a valid LinkedIn profile URL"
    )
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  projects: z
    .array(z.string().url("Please enter a valid URL for each project"))
    .max(5, "Maximum 5 projects allowed")
    .optional()
    .default([]),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const applicationFormSchema = applicationSchema.transform(data => ({
  ...data,
  githubProfile: data.githubProfile === "" ? null : data.githubProfile,
  linkedinProfile: data.linkedinProfile === "" ? null : data.linkedinProfile,
  notes: data.notes === "" ? null : data.notes,
  projects: data.projects || [],
}));

export type ApplicationData = z.infer<typeof applicationFormSchema>;
