import type { KnipConfig } from "knip";

export default {
	entry: ["src/index.ts", "src/context/provider.tsx"],
	ignore: [],
	ignoreDependencies: ["npm-check-updates"],
} satisfies KnipConfig;
