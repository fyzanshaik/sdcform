"use server";

import { db } from "@/lib/drizzle";
import { applications } from "@/lib/schema";
import { ApplicationFormData, applicationFormSchema } from "@/schemas/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function submitApplicationData(data: ApplicationFormData) {
  try {
    const validatedData = applicationFormSchema.parse(data);
    console.log("Validated data:", validatedData); // Debug log

    // Check if application with this roll number already exists
    const existingApplication = await db
      .select()
      .from(applications)
      .where(eq(applications.rollNumber, validatedData.rollNumber))
      .limit(1);

    if (existingApplication.length > 0) {
      return {
        success: false,
        message: "An application with this roll number already exists",
      };
    }

    // Prepare data for database insertion
    const dbData = {
      ...validatedData,
      projects:
        validatedData.projects && validatedData.projects.length > 0
          ? JSON.stringify(validatedData.projects)
          : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [application] = await db
      .insert(applications)
      .values(dbData)
      .returning();

    console.log("Application created:", application.id); // Debug log

    revalidatePath("/applications");

    return {
      success: true,
      message: "Application submitted successfully!",
      data: {
        id: application.id,
        name: application.name,
        submittedAt: application.createdAt,
      },
    };
  } catch (error: unknown) {
    // Enhanced error logging with type guards
    if (typeof error === "object" && error !== null) {
      if ("name" in error) {
        console.error("Error name:", (error as { name?: string }).name);
      }
      if ("message" in error) {
        console.error(
          "Error message:",
          (error as { message?: string }).message
        );
      }
      if ("stack" in error) {
        console.error("Error stack:", (error as { stack?: string }).stack);
      }
      console.error("Full error object:", error);
    } else {
      console.error("Error:", error);
    }

    // ZodError
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name?: string }).name === "ZodError"
    ) {
      return {
        success: false,
        message: "Please check your form data",
        errors: (error as { errors?: unknown }).errors,
      };
    }

    // Database constraint errors (Drizzle throws different errors)
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: string }).message === "string"
    ) {
      const message = (error as { message: string }).message;

      if (
        message.includes("duplicate key") ||
        message.includes("unique constraint")
      ) {
        return {
          success: false,
          message: "An application with this roll number already exists",
        };
      }

      if (message.includes("connection") || message.includes("network")) {
        return {
          success: false,
          message: "Database connection failed. Please try again later.",
        };
      }
    }

    return {
      success: false,
      message: "Failed to submit application. Please try again.",
      error:
        process.env.NODE_ENV === "development"
          ? typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: string }).message === "string"
            ? (error as { message: string }).message
            : String(error)
          : undefined,
    };
  }
}
