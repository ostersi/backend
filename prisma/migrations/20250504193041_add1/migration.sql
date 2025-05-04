-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityId" INTEGER,
    "userId" INTEGER,
    "dataBefore" JSONB,
    "dataAfter" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);
