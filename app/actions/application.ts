"use server";

import prisma from "@/lib/prisma";
import {
  ApplicationFormData,
  applicationFormSchema,
} from "@/schemas/schema";
import { revalidatePath } from "next/cache";

export async function submitApplicationData(data: ApplicationFormData) {
  try {
    const validatedData = applicationFormSchema.parse(data);

    await prisma.$connect();

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
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name?: string }).name === "ZodError"
    ) {
      return {
        success: false,
        message: "Please check your form data",
      };
    }

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

    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: string }).message === "string" &&
      ((error as { message: string }).message.includes("connect") ||
        (error as { code?: string }).code === "P1001")
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