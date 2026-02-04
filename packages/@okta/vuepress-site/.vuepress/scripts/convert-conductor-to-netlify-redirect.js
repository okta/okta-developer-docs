const fs = require("fs");
const path = require("path");

const yamlPath = path.resolve(__dirname, "../../conductor.yml");
const text = fs.readFileSync(yamlPath, "utf8");

const redirectBlocks = text.match(/- from:[\s\S]*?to: .*/g);

if (!redirectBlocks) {
  console.error("No redirects found.");
  process.exit(1);
}

const lines = redirectBlocks.map(block => {
  const fromMatch = block.match(/from:\s*(\S+)/);
  const toMatch   = block.match(/to:\s*(\S+)/);

  if (fromMatch && toMatch) {
    return `${fromMatch[1]} ${toMatch[1]} 301!`;
  }
}).filter(Boolean); // remove nulls

fs.writeFileSync("_redirects", lines.join("\n"), "utf8");

console.log("_redirects file created.");
