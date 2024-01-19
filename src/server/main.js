import { serve } from "https://deno.land/std/http/server.ts";
import { serveDir } from "https://deno.land/std/http/file_server.ts";
import { handle } from "./../../dist/server/entry.mjs";

serve(
  (req) => {
    // Check the request, maybe do static file handling here.
    const pathname = new URL(req.url).pathname;
    if (pathname === "/" || pathname.startsWith("/status")) {
      return handle(req);
    }

    // return serveDir(req, {
    //   fsRoot: "...",
    // });
  },
  { port: 8085 },
);