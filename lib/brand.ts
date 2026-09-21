export const brand = {
  name: "TechFolx",
  line: "Where interaction meets space.",
  sell: "TechFolx transforms physical spaces into interactive, tech-driven experiences that teach, engage, and immerse people.",
  position:
    "TechFolx creates tech-infused immersive experiences that blend interaction, spatial flow, and sensory design.",
  lede: "We design how people move, discover, and engage with technology inside physical spaces.",
  words: ["interaction", "immersion", "flow", "discovery", "learning"] as const,
  site: "https://soulhause.com",
  luma: "https://luma.com/soulhause",
  email: "hello@soulhause.com",
  logo: "/soulhause-logo.png",
} as const;

export const brandLineFull = "Where interaction meets space";

export const brandPillars = [
  {
    id: "installations",
    name: "Immersive Tech Installations",
    line: "Technology people can touch, watch, and trigger.",
    points: [
      "Interactive screens",
      "Projection mapping",
      "Sensor-based experiences",
      "Data-driven visuals",
    ],
  },
  {
    id: "spatial",
    name: "Spatial Experience Design",
    line: "How a person moves through a room is part of the design.",
    points: [
      "Flow mapping",
      "Discovery moments",
      "Sensory storytelling",
      "Tech-enhanced pathways",
    ],
  },
  {
    id: "learning",
    name: "Tech-Driven Learning Environments",
    line: "Experiences that teach by letting people interact.",
    points: [
      "Hands-on tech labs",
      "Interactive educational exhibits",
      "Digital-physical hybrid learning",
    ],
  },
] as const;
