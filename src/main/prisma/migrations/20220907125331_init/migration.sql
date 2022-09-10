-- CreateTable
CREATE TABLE "Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,
    CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "folderId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "fileSize" REAL NOT NULL,
    "filepath" TEXT NOT NULL,
    "fileExt" TEXT NOT NULL,
    "accessHash" TEXT NOT NULL,
    "fileReference" BLOB NOT NULL,
    "messageId" INTEGER NOT NULL
);
