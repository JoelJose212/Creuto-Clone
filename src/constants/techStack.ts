export const TECH_CATEGORIES = [
  "Front-End",
  "Back-End",
  "Design & Prototyping",
  "Database & ORM",
  "DevOps & Cloud",
  "Mobile Development",
  "Machine Learning & AI",
  "Testing & QA",
] as const

export type TechCategory = typeof TECH_CATEGORIES[number]

export const TECH_DATA: Record<TechCategory, string[]> = {
  "Front-End": ["React", "Angular", "Vue.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "PWA", "WordPress"],
  "Back-End": ["Node.js", "Python", "Java", "C#", "PHP", "Go", "Rust", "Laravel", "Ruby on Rails", "NestJS"],
  "Design & Prototyping": ["Figma", "Adobe XD", "Sketch", "Adobe Illustrator", "Adobe Photoshop", "InVision", "Framer", "Storybook"],
  "Database & ORM": ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "DynamoDB", "Cassandra", "Elasticsearch", "Supabase", "Prisma", "Sequelize", "TypeORM", "Mongoose"],
  "DevOps & Cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform"],
  "Mobile Development": ["React Native", "Flutter", "Android", "iOS", "Swift", "Kotlin", "Java"],
  "Machine Learning & AI": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Python", "OpenAI", "LangChain"],
  "Testing & QA": ["Jest", "Cypress", "Selenium", "Postman", "Swagger", "GraphQL", "Apollo"],
}
