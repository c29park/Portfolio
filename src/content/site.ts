const email = "c29park@uwaterloo.ca";

export const site = {
  name: "Chris Park",
  initials: "CP",
  role: "Computer Engineering @ University of Waterloo",
  tagline:
    "I build and design meaningful AI/ML based solutions for real-world problems.",
  email,
  bio: [
    "Hi, my name is Chris Park. I am currently wrapping up my second year at University of Waterloo, pursuing a BASc degree in computer engineering. This site lists the major and minor projects I have worked on from the start of my career.",
    "Recently I conducted research on Public Salience Prediction on Famous Individuals with Multimodal Analysis as a first co-author with a fellow MS student at DSLab, Kwangwoon University, South Korea. The paper is still being written (expected submission: November 2025), with more experiments to be done to perfect the research.",
    "For the work term prior to that, I worked at the same lab and deepened my understanding of LLM domain adaptation and performance optimization. For my first work term, I prototyped a machine learning solution for preventing fraud against seniors. I also worked on the VEX Robotics Competition for more than four years during high school.",
  ],
  links: [
    { label: "Email", href: `mailto:${email}` },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/chris-park-0b83b2291/" },
    { label: "Learning Blog", href: "https://c29park.github.io" },
  ],
} as const;
