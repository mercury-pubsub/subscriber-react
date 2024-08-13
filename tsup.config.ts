import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	target: "es5",
	minify: true,
	format: ["cjs", "esm"],
	dts: true,
	sourcemap: true,
	splitting: false,
	clean: true,
	treeshake: true,
});
