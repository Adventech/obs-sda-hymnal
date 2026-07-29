import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const workflow = fs
  .readFileSync(
    path.join(repositoryRoot, ".github", "workflows", "deploy-pages.yml"),
    "utf8",
  )
  .replaceAll("\r\n", "\n");

test("Pages build audits the exact locked graph before artifact creation", () => {
  assert.match(workflow, /run: npm ci --ignore-scripts/);
  assert.doesNotMatch(workflow, /run: npm install/);
  assert.equal(
    workflow.match(/npm audit --audit-level=high/g)?.length,
    1,
    "high/critical audit must be an explicit single build gate",
  );
  assert.ok(
    workflow.indexOf("npm ci --ignore-scripts") <
      workflow.indexOf("npm audit --audit-level=high"),
    "audit must inspect the installed locked graph",
  );
  assert.ok(
    workflow.indexOf("npm audit --audit-level=high") <
      workflow.indexOf("npm run build"),
    "audit must pass before the production build",
  );
  assert.ok(
    workflow.indexOf("npm audit --audit-level=high") <
      workflow.indexOf("actions/upload-pages-artifact"),
    "audit must pass before artifact creation",
  );
});
