import tailwindcss from "@tailwindcss/vite";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  // Fixed port: sharing :5173 with other local projects lets their service
  // workers hijack this app's module requests (white screen + MIME errors).
  server: { port: 5190, strictPort: true },
  build: { target: "esnext" },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
