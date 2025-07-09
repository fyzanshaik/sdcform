-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roll_number" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "year_of_study" INTEGER NOT NULL,
    "preferred_position" TEXT NOT NULL,
    "github_profile" TEXT NOT NULL,
    "linkedin_profile" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);
