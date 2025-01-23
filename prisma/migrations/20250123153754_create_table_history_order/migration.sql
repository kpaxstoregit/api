-- CreateTable
CREATE TABLE "HistoryOrder" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "spentTotal" DOUBLE PRECISION NOT NULL,
    "productsBought" JSONB NOT NULL,
    "orderDetails" JSONB,

    CONSTRAINT "HistoryOrder_pkey" PRIMARY KEY ("id")
);
