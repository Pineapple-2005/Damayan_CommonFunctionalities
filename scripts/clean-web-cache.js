const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, "..", "web", ".next");

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Cleared web/.next");
} catch (error) {
  console.error("Failed to clear web/.next", error);
  process.exitCode = 1;
}
