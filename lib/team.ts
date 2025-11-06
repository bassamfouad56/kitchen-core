import fs from "fs";
import path from "path";

export type TeamMemberAsset = {
  id: string;
  name: string;
  role: string;
  image: string;
};

function toTitleCase(input: string): string {
  return input
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function readTeamFromPublic(): TeamMemberAsset[] {
  const teamDir = path.join(process.cwd(), "public", "team");
  if (!fs.existsSync(teamDir)) return [];

  const imageExtensions = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".avif",
    ".svg",
  ]);

  const files = fs.readdirSync(teamDir, { withFileTypes: true });
  return files
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
    .map((name, index) => {
      const base = name.replace(/\.(png|jpe?g|webp|gif|avif|svg)$/i, "");
      const pretty = toTitleCase(base);
      return {
        id: `team-${index}`,
        name: pretty || `Team Member ${index + 1}`,
        role: "Team Member",
        image: `/team/${name}`,
      };
    });
}







