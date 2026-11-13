// Guard for `npm run deploy`: refuse to publish code that isn't committed,
// so the live site always matches a commit on GitHub.
// Bypass (not recommended):  PowerShell  $env:ALLOW_DIRTY=1; npm run deploy
//                            bash        ALLOW_DIRTY=1 npm run deploy
import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

if (process.env.ALLOW_DIRTY) {
  console.warn("⚠  ALLOW_DIRTY set — skipping the clean-working-tree check.");
  process.exit(0);
}

let status;
try {
  status = run("git status --porcelain");
} catch {
  console.error("✖ Not a git repository (or git is not installed).");
  process.exit(1);
}

if (status) {
  console.error("✖ Deploy blocked: you have uncommitted changes.\n");
  console.error(status.split("\n").map((l) => "    " + l).join("\n"));
  console.error('\n  Commit first:  git add -A && git commit -m "your message" && git push\n');
  process.exit(1);
}

try {
  const branch = run("git rev-parse --abbrev-ref HEAD");
  const ahead = run(`git rev-list --count origin/${branch}..HEAD`);
  if (ahead !== "0") console.warn(`⚠  ${ahead} commit(s) on '${branch}' not pushed yet — run: git push`);
} catch {
  /* no upstream branch — fine */
}

console.log("✔ Working tree clean — proceeding with deploy.");
