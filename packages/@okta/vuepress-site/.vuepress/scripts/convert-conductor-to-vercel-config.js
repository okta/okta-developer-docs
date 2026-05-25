const fs = require("fs");
const path = require("path");

const yamlPath = path.resolve(__dirname, "../../conductor.yml");
const outputPath = path.resolve(__dirname, "../../vercel.json");
const bulkRedirectsPath = path.resolve(__dirname, "../../vercel-redirects.json");

const text = fs.readFileSync(yamlPath, "utf8");
const redirectBlocks = text.match(/- from:[\s\S]*?to: .*/g);

if (!redirectBlocks) {
  console.error("No redirects found.");
  process.exit(1);
}

const redirects = redirectBlocks
  .map((block) => {
    const fromMatch = block.match(/from:\s*(\S+)/);
    const toMatch = block.match(/to:\s*(\S+)/);

    if (fromMatch && toMatch) {
      return {
        source: fromMatch[1],
        destination: toMatch[1],
        permanent: true,
      };
    }
  })
  .filter(Boolean);

const vercelConfig = {
  bulkRedirectsPath: "vercel-redirects.json",
};

fs.writeFileSync(
  outputPath,
  `${JSON.stringify(vercelConfig, null, 2)}\n`,
  "utf8"
);
fs.writeFileSync(
  bulkRedirectsPath,
  `${JSON.stringify(redirects, null, 2)}\n`,
  "utf8"
);

console.log("vercel.json and vercel-redirects.json files created.");
