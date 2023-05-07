import {
  mobile,
  backend,
  web,
  bcpLogo,
  ualLogo,
  vortalLogo,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
];

const experiences = [
  {
    title: "Computer Science Student",
    company_name: "Universidade Autonoma de Lisboa",
    icon: ualLogo,
    iconBg: "#0474a4",
    date: "September 2019 - July 2021",
    points: [
      "Developing an understanding of data structures, algorithms, and software design principles.",
      "Collaborating with classmates on small-scale projects and assignments to develop problem-solving skills.",
      "Participating in study groups and online coding platforms to improve programming skills and apply theoretical knowledge.",
      "Acquiring foundational knowledge in programming languages such as Python and Java.",
    ],
  },
  {
    title: "React Developer",
    company_name: "Vortal",
    icon: vortalLogo,
    iconBg: "#fb1444",
    date: "July 2021 - May 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React/React-native Developer",
    company_name: "Millennium bcp",
    icon: bcpLogo,
    iconBg: "#d4045c",
    date: "May 2022 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

export { services, experiences };
