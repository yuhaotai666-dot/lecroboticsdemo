// Vite config, de-Lovable'd.
//
// Previously this file delegated everything to @lovable.dev/vite-tanstack-config.
// That wrapper bundled the plugin list, CSS transformer, aliases, dedupe rules and
// dev-server defaults. Everything it did that this project actually relies on is
// now spelled out below, so the build no longer depends on the Lovable platform.
//
// Dropped on purpose (Lovable-sandbox-only, no effect outside their editor):
//   - @tanstack/devtools-vite injection
//   - devServerFnErrorLogger / devSsrErrorLogger
//   - lovableAssetsProxyPlugin, hmr-gate, dev-server-bridge
//   - sandbox detection that forced port 8080 with strictPort
//   - the forced cloudflare-module nitro preset (nitro now defaults to node-server)

import { defineConfig, loadEnv } from "vite";
import type { PluginOption, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig(async ({ mode, command }): Promise<UserConfig> => {
  // Mirror the wrapper's VITE_* injection into import.meta.env.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const define = Object.fromEntries(
    Object.entries(env).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
  );

  const plugins: PluginOption[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Keep server-only modules out of the client bundle.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      // Route the bundled server entry through src/server.ts (the SSR error wrapper).
      server: { entry: "server" },
    }),
  ];

  // nitro is build-only. No preset => node-server, which is what we want locally.
  // Output lands in .output/; run it with `npm run preview` (node .output/server/index.mjs).
  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro());
  }

  plugins.push(react());

  return {
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    server: { host: "::", port: 8080 },
    plugins,
  };
});
