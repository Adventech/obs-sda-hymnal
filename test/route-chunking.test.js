import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const routeComponents = [
  "src/components/Dock/DockSearch.vue",
  "src/components/Dock/DockQueue.vue",
  "src/components/Dock/DockSettings.vue",
];

const deferredDependencies = [
  "src/hymnal/sda-hymnal-db.json",
  "src/stores/queue.js",
];

const normalizeModuleId = (moduleId) => moduleId.replaceAll("\\", "/");

const chunkOwnsModule = (chunk, sourcePath) =>
  chunk.modules.some((moduleId) =>
    normalizeModuleId(moduleId).includes(`/${sourcePath}`),
  );

test("dock routes and their data remain outside the initial chunk graph", async () => {
  let chunks;

  await build({
    root: repositoryRoot,
    configFile: path.join(repositoryRoot, "vite.config.js"),
    logLevel: "silent",
    build: {
      write: false,
    },
    plugins: [
      {
        name: "capture-route-chunk-graph",
        generateBundle(_outputOptions, bundle) {
          chunks = Object.values(bundle)
            .filter((output) => output.type === "chunk")
            .map((chunk) => ({
              fileName: chunk.fileName,
              imports: [...chunk.imports],
              dynamicImports: [...chunk.dynamicImports],
              isEntry: chunk.isEntry,
              isDynamicEntry: chunk.isDynamicEntry,
              modules: Object.keys(chunk.modules),
            }));
        },
      },
    ],
  });

  assert.ok(chunks, "Vite did not expose the generated chunk graph");
  const entry = chunks.find((chunk) => chunk.isEntry);
  assert.ok(entry, "production build did not generate an entry chunk");

  const chunksByFileName = new Map(
    chunks.map((chunk) => [chunk.fileName, chunk]),
  );
  const initialChunkFiles = new Set();
  const visitStaticImport = (fileName) => {
    if (initialChunkFiles.has(fileName)) return;
    initialChunkFiles.add(fileName);
    const chunk = chunksByFileName.get(fileName);
    chunk?.imports.forEach(visitStaticImport);
  };
  visitStaticImport(entry.fileName);

  assert.equal(
    entry.dynamicImports.includes(entry.fileName),
    false,
    "an entry chunk cannot also be its own lazy route target",
  );

  for (const sourcePath of routeComponents) {
    const owners = chunks.filter((chunk) =>
      chunkOwnsModule(chunk, sourcePath),
    );
    assert.equal(
      owners.length,
      1,
      `${sourcePath} must belong to exactly one generated chunk`,
    );
    assert.equal(
      owners[0].isDynamicEntry,
      true,
      `${sourcePath} must remain a dynamic route entry`,
    );
    assert.equal(
      initialChunkFiles.has(owners[0].fileName),
      false,
      `${sourcePath} leaked into the initial static chunk graph`,
    );
  }

  for (const sourcePath of deferredDependencies) {
    const initialOwners = chunks.filter(
      (chunk) =>
        initialChunkFiles.has(chunk.fileName) &&
        chunkOwnsModule(chunk, sourcePath),
    );
    assert.deepEqual(
      initialOwners.map((chunk) => chunk.fileName),
      [],
      `${sourcePath} leaked into the initial static chunk graph`,
    );
  }
});
