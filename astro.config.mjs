import { defineConfig } from "astro/config";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://ricekot.com",
  integrations: [mdx(), sitemap(), tailwind()],
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
