import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const caseStudies = [
    {
      title: "Škoda Auto Sales Training App",
      slug: "skoda-auto",
      badge: "Mobile App",
      description: "An interactive iPad application to train Škoda Auto sales personnel on new vehicle features and specifications.",
      gradient: "from-green-500/20 to-emerald-900/20",
      order: 1,
    },
    {
      title: "Binimise Smart City Platform",
      slug: "binimise",
      badge: "IoT Platform",
      description: "A comprehensive IoT dashboard for managing smart waste collection across metropolitan areas, optimizing routes and reducing carbon footprint.",
      gradient: "from-blue-500/20 to-indigo-900/20",
      order: 2,
    },
    {
      title: "Custom Cloud ERP",
      slug: "custom-erp",
      badge: "Web App",
      description: "A fully bespoke enterprise resource planning system tailored to streamline manufacturing and logistics operations.",
      gradient: "from-orange-500/20 to-red-900/20",
      order: 3,
    },
    {
      title: "Nomina Enterprise HR & Payroll",
      slug: "nomina-hr",
      badge: "SaaS",
      description: "A robust HR and payroll management solution handling thousands of employees with automated compliance and tax calculations.",
      gradient: "from-purple-500/20 to-fuchsia-900/20",
      order: 4,
    },
  ]

  console.log("Seeding case studies...")

  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: {},
      create: cs,
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
