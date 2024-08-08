// deleteDokumenRows.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.dokumen.deleteMany({});
  console.log("All rows deleted from Dokumen table");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
