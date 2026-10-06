// Cloudflare Worker: serves the built site from ./dist and handles the TYGA API.
import { handleTyga, handleOptions } from "./tyga.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/tyga") {
      if (request.method === "OPTIONS") return handleOptions();
      if (request.method === "POST") return handleTyga(request, env);
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST, OPTIONS" } });
    }
    return env.ASSETS.fetch(request);
  },
};
