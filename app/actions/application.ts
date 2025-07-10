"use server";

import prisma from "@/lib/prisma";
import { ApplicationFormData, applicationFormSchema } from "@/schemas/schema";
import { revalidatePath } from "next/cache";

export async function submitApplicationData(data: ApplicationFormData) {
  try {
    console.log("Received data:", data); // Debug log
    
    const validatedData = applicationFormSchema.parse(data);
    console.log("Validated data:", validatedData); // Debug log

    // Test database connection
    await prisma.$connect();
    console.log("Database connected successfully"); // Debug log

    const application = await prisma.application.create({
      data: validatedData,
    });

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
        console.error("Error message:", (error as { message?: string }).message);
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

    // Unique constraint error
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: string }).message === "string" &&
      (error as { message: string }).message.includes("Unique constraint")
    ) {
      return {
        success: false,
        message: "An application with this roll number already exists",
      };
    }

    // Database connection errors
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: string }).message === "string" &&
      ((error as { message: string }).message.includes("connect") ||
        ("code" in error && (error as { code?: string }).code === "P1001"))
    ) {
      return {
        success: false,
        message: "Database connection failed. Please try again later.",
      };
    }

    return {
      success: false,
      message: "Failed to submit application. Please try again.",
      error:
        process.env.NODE_ENV === "development"
          ? (typeof error === "object" &&
              error !== null &&
              "message" in error &&
              typeof (error as { message?: string }).message === "string"
              ? (error as { message: string }).message
              : String(error))
          : undefined,
    };
  } finally {
    await prisma.$disconnect();
  }
}