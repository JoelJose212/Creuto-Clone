export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
  learnMoreHref: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
