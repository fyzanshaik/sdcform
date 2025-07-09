"use server";

import prisma from "@/lib/prisma";
import { ApplicationFormData, applicationFormSchema } from "@/schemas/schema";
import { revalidatePath } from "next/cache";

export async function submitApplicationData(data: ApplicationFormData) {
  try {
    const validatedData = applicationFormSchema.parse(data);

    const application = await prisma.application.create({
      data: validatedData,
    });

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
  } catch (error) {
    console.error("Application submission error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        message: "Please check your form data",
        errors: JSON.parse(error.message),
      };
    }

    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return {
        success: false,
        message: "An application with this roll number already exists",
      };
    }

    return {
      success: false,
      message: "Failed to submit application. Please try again.",
    };
  }
}