// Runs after `next build`. The standalone server only serves `public/` and
// `.next/static/` when they sit next to it, so copy them in.
import { cpSync, existsSync } from "node:fs";

const out = ".next/standalone";
if (!existsSync(out)) {
  console.log("[postbuild] no standalone output, nothing to copy");
  process.exit(0);
}
cpSync("public", `${out}/public`, { recursive: true });
cpSync(".next/static", `${out}/.next/static`, { recursive: true });
console.log("[postbuild] copied public/ and .next/static/ into .next/standalone");
