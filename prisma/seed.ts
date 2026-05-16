import { PrismaClient } from "@prisma/client"
import { caseStudiesData } from "../src/constants/caseStudiesData"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding case studies...")

  for (let i = 0; i < caseStudiesData.length; i++) {
    const cs = caseStudiesData[i]
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: {
        category: cs.category,
        title: cs.title,
        description: cs.description,
        gradient: cs.gradient,
        accentColor: cs.accentColor,
        sortOrder: i + 1,
      },
      create: {
        slug: cs.slug,
        category: cs.category,
        title: cs.title,
        description: cs.description,
        gradient: cs.gradient,
        accentColor: cs.accentColor,
        sortOrder: i + 1,
      },
    })
  }

  console.log("Seeding complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
