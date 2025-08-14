import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["server.js"], // أو main.ts لو TS
  format: ["cjs"],
  outDir: "dist",
  splitting: false,
  bundle: true, // ⬅️ مهم: يعمل bundling
  external: [/^node:.*/, /^[@a-zA-Z0-9_-]+$/], // أي حاجة جاية من node_modules
  sourcemap: false,
  minify: false,
  clean: true,
});
