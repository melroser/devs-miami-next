export type Volume = {
  numeral: string;
  label: string;
  href: string;
  kicker: string;
  tint: string;
};

export const volumes: Volume[] = [
  { numeral: "I", label: "Cover", href: "/", kicker: "Miami Software Journal", tint: "#ff6b4a" },
  { numeral: "II", label: "Flagship", href: "/wingit", kicker: "Wingit", tint: "#f3b13f" },
  { numeral: "III", label: "Roadmap", href: "/roadmap", kicker: "What Comes Next", tint: "#ff4d6d" },
  { numeral: "IV", label: "Products", href: "/products", kicker: "In This Issue", tint: "#ff6b4a" },
  { numeral: "V", label: "Team", href: "/team", kicker: "The Masthead", tint: "#efe8da" },
  { numeral: "VI", label: "Contact", href: "/contact", kicker: "Closing Mark", tint: "#f3b13f" },
  { numeral: "VII", label: "Finance", href: "/finance", kicker: "Sanctions Intelligence", tint: "#3b82f6" }
];
