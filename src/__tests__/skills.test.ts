import { describe, expect, it } from "vitest";
import { parseSkillsResponse } from "../skills.ts";

describe("parseSkillsResponse", () => {
  it("uses the stable skill id, removes duplicates, and preserves the source view", () => {
    const skills = parseSkillsResponse(
      {
        skills: [
          {
            id: "anthropics/skills/webapp-testing",
            name: "webapp-testing",
            source: "anthropics/skills",
            slug: "webapp-testing",
            description: "Test web apps.",
            installs: 42,
            url: "https://www.skills.sh/anthropics/skills/webapp-testing",
          },
          { id: "mirror/webapp-testing", isDuplicate: true },
        ],
      },
      "hot",
    );

    expect(skills).toHaveLength(1);
    expect(skills[0]).toMatchObject({ id: "anthropics/skills/webapp-testing", installs: 42, views: ["hot"] });
  });

  it("accepts proxy data arrays and derives an id from source and slug", () => {
    const skills = parseSkillsResponse(
      [{ source: "vercel-labs/skills", slug: "react-best-practices", install_command: "npx skills add" }],
      "trending",
    );

    expect(skills[0]).toMatchObject({
      id: "vercel-labs/skills/react-best-practices",
      installCommand: "npx skills add",
      views: ["trending"],
    });
  });
});
