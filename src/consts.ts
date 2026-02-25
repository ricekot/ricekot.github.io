import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Akshath's Blog",
  EMAIL: "hello@ricekot.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "My personal website. I blog here.",
};

export const ARCHIVE: Metadata = {
  TITLE: "Archive",
  DESCRIPTION: "A chronological list of all blog posts.",
};

export const ABOUT: Metadata = {
  TITLE: "About",
  DESCRIPTION: "About the author.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const ART: Metadata = {
  TITLE: "Art",
  DESCRIPTION: "Video editing and animation work.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/ricekot"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/ricekot",
  },
  { 
  NAME: "x",
    HREF: "https://x.com/ricekot_",
  },
];
