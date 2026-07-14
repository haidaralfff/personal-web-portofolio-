// Edit your CV data here. This will be used by Gemini to generate an ATS-friendly PDF.

export const cvData = {
  personal: {
    name: "Haidar Habibi",
    email: "haidarhabibi178@gmail.com",
    phone: "+62 812-3456-7890",
    location: "Kebumen, Central Java, Indonesia",
    linkedin: "linkedin.com/in/haidar-habibi",
    github: "github.com/haidaralfff",
  },

  summary:
    "Frontend Developer and Computer Science student with hands-on experience building modern web applications using React and Tailwind CSS. Focused on writing clean, maintainable code and creating user-friendly interfaces. Currently seeking opportunities to contribute to real-world projects and grow as a developer.",

  education: [
    {
      school: "Universitas Putra Bangsa",
      degree: "Bachelor of Computer Science",
      period: "2024 – Present",
      details:
        "Currently in semester 4. Coursework includes web development, data structures, databases, and software engineering.",
    },
    {
      school: "SMK Maarif 9 Kebumen",
      degree: "Light Vehicle Engineering",
      period: "2021 – 2024",
      details:
        "Studied vehicle systems, mechanics, automotive electronics, and engine diagnostics.",
    },
  ],

  skills: {
    frontend: ["React", "Tailwind CSS", "JavaScript", "Next.js", "HTML/CSS"],
    tools: ["Git", "Figma", "VS Code", "Vite", "Firebase"],
    learning: ["TypeScript", "Node.js", "PostgreSQL"],
  },

  experience: [
    {
      title: "Freelance Web Developer",
      period: "2024 – Present",
      description:
        "Building modern, responsive websites and web applications for clients using React, Tailwind CSS, and Firebase. Focused on delivering clean code and intuitive user experiences.",
    },
  ],

  certifications: [
    {
      title: "Burp Suite for Beginner",
      issuer: "Cyber Academy Indonesia",
      date: "2022",
    },
    {
      title: "Introduction to Information Security",
      issuer: "Cyber Academy Indonesia",
      date: "2022",
    },
  ],

  projects: [
    {
      title: "SIPBANSOS",
      tech: ["React", "Tailwind CSS", "PostgreSQL"],
      description:
        "Social assistance information system for managing data, streamlining the process from application to distribution.",
    },
    {
      title: "Brew & Bean",
      tech: ["Next.js", "Node.js", "MongoDB"],
      description:
        "Digital menu and POS system for a modern coffee shop with an intuitive browsing and checkout experience.",
    },
  ],
};
