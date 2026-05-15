import { Code2, Smartphone, Cloud, Brain, Globe, Rocket, LucideIcon } from "lucide-react"

export type Service = {
  num: string
  title: string
  desc: string
  icon: LucideIcon
}

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Custom Software Development",
    desc: "Your business deserves software built around its exact needs. We design and develop custom software solutions that align with your workflows, goals, and growth strategy — scalable, secure, and built to evolve.",
    icon: Code2,
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "We build modern, high-performance mobile applications for iOS and Android that users love. From intuitive UI to seamless backend integration, every app is optimized for speed and reliability.",
    icon: Smartphone,
  },
  {
    num: "03",
    title: "DevOps & Cloud Engineering",
    desc: "Accelerate your delivery cycles and scale with complete confidence. We work across AWS, GCP, and Azure to build resilient, cost-efficient cloud architectures.",
    icon: Cloud,
  },
  {
    num: "04",
    title: "AI Engineering Services",
    desc: "We design and deploy production-ready AI solutions — from ML models and NLP pipelines to intelligent automation and LLM-powered applications.",
    icon: Brain,
  },
  {
    num: "05",
    title: "Web Development",
    desc: "We build fast, scalable, visually compelling web platforms using modern frameworks and SEO best practices.",
    icon: Globe,
  },
  {
    num: "06",
    title: "Startup Product Engineering",
    desc: "We partner with founders to turn ideas into fully functional, market-ready products fast — from MVP scoping to full-scale engineering.",
    icon: Rocket,
  },
]
