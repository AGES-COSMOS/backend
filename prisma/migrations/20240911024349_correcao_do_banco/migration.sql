/*
  Warnings:

  - You are about to drop the `EventKeyword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventKeyword" DROP CONSTRAINT "EventKeyword_event_id_fkey";

-- DropForeignKey
ALTER TABLE "EventKeyword" DROP CONSTRAINT "EventKeyword_keyword_id_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "imageURL" TEXT;

-- DropTable
DROP TABLE "EventKeyword";
