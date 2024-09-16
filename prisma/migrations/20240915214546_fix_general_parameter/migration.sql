/*
  Warnings:

  - Changed the type of `parameter` on the `GeneralParameters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GeneralParameters" DROP COLUMN "parameter",
ADD COLUMN     "parameter" JSONB NOT NULL;
