-- CreateTable
CREATE TABLE "ParagraphGameLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "hideCreate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ParagraphGameLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParagraphGameLink_code_key" ON "ParagraphGameLink"("code");
