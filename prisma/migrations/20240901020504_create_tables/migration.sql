/*
  Warnings:

  - You are about to drop the `AboutUs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AboutUs";

-- CreateTable
CREATE TABLE "GeneralParameters" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "instagramURL" TEXT NOT NULL,
    "youtubeURL" TEXT NOT NULL,
    "linkedinURL" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "GeneralParameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" CHAR(11),
    "cpfcnpj" CHAR(14),
    "photoURL" TEXT,
    "blocked" BOOLEAN NOT NULL,
    "registration_number" VARCHAR(50),
    "institution_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "number" VARCHAR(50) NOT NULL,
    "complement" VARCHAR(100),
    "neighborhood" VARCHAR(50) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "contry" VARCHAR(30) NOT NULL,
    "postalCode" VARCHAR(8) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageURL" TEXT,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "hour" TIME NOT NULL,
    "IsOnline" BOOLEAN NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "institution_id" INTEGER NOT NULL,
    "project_id" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "contact" VARCHAR(50),
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "status" VARCHAR(30) NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "institution_id" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialNetwork" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "SocialNetwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "project_id" INTEGER,
    "event_id" INTEGER,
    "user_id" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLikes" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "PostLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "PostComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "project_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("project_id","category_id")
);

-- CreateTable
CREATE TABLE "EventCategory" (
    "event_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("event_id","category_id")
);

-- CreateTable
CREATE TABLE "ProjectKeyword" (
    "project_id" INTEGER NOT NULL,
    "keyword_id" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "ProjectKeyword_pkey" PRIMARY KEY ("project_id","keyword_id")
);

-- CreateTable
CREATE TABLE "EventKeyword" (
    "event_id" INTEGER NOT NULL,
    "keyword_id" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "EventKeyword_pkey" PRIMARY KEY ("event_id","keyword_id")
);

-- CreateTable
CREATE TABLE "UsersSocialNetwork" (
    "user_id" INTEGER NOT NULL,
    "social_network_id" INTEGER NOT NULL,
    "social_network_URL" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "UsersSocialNetwork_pkey" PRIMARY KEY ("user_id","social_network_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_key" ON "Address"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComments" ADD CONSTRAINT "PostComments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCategory" ADD CONSTRAINT "EventCategory_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCategory" ADD CONSTRAINT "EventCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectKeyword" ADD CONSTRAINT "ProjectKeyword_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectKeyword" ADD CONSTRAINT "ProjectKeyword_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventKeyword" ADD CONSTRAINT "EventKeyword_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventKeyword" ADD CONSTRAINT "EventKeyword_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSocialNetwork" ADD CONSTRAINT "UsersSocialNetwork_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSocialNetwork" ADD CONSTRAINT "UsersSocialNetwork_social_network_id_fkey" FOREIGN KEY ("social_network_id") REFERENCES "SocialNetwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
