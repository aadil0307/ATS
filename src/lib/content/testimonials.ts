export type Testimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string; // URL to avatar image
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "CTO",
    company: "FinTech Solutions",
    text: "Ace Tech Solutions transformed our legacy banking system into a modern, scalable platform. They delivered 3 weeks ahead of schedule and reduced our infrastructure costs by 40% through optimized cloud architecture.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Priya Mehta",
    role: "Product Director",
    company: "HealthTech Startup",
    text: "From concept to launch, they built our AI-powered health monitoring app with incredible attention to detail. User engagement increased by 60% after launch, and their post-launch support has been exceptional.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Arjun Patel",
    role: "Founder & CEO",
    company: "EduTech Platform",
    text: "Their DevOps expertise transformed our deployment process from hours to minutes. The team's technical depth and communication made them feel like an extension of our own engineering team.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sneha Reddy",
    role: "VP of Engineering",
    company: "E-commerce Leader",
    text: "The comprehensive security audit they performed uncovered critical vulnerabilities in our payment system that we had missed. Their remediation plan was thorough and implemented with zero downtime.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
];