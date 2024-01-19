/* Minimal deno server.
 * Place config under the same path /w the excutable.
 * config.toml:
 * port = 8085
 * root_dir = "/xxx"
 */
import { serve } from "http/server.ts";
import { serveDir } from "http/file_server.ts";
import { handle } from "./../../dist/server/entry.mjs";
import { dirname, fromFileUrl, SEP } from "path/mod.ts";
import { parse } from "toml/mod.ts";

const PROG_PATH = Deno.args.includes("--is_compiled_binary")
  ? Deno.execPath()
  : fromFileUrl(Deno.mainModule);
const DEFAULT_ROOT_DIR = Deno.args.includes("--is_compiled_binary")
  ? `${dirname(PROG_PATH)}${SEP}client`
  : `${dirname(dirname(dirname(PROG_PATH)))}${SEP}dist${SEP}client`;
const CONFIG_FILE = `${dirname(PROG_PATH)}${SEP}config.toml`;

function exitWithError(errstr) {
  console.error(errstr);
  Deno.exit(1);
}

function isUndefined(a) {
  return typeof a === "undefined";
}

let conf;

(async () => {
  try {
    conf = parse(await Deno.readTextFile(CONFIG_FILE));
  } catch (err) {
    if (err instanceof SyntaxError) {
      exitWithError("Parse toml failed!");
    } else if (err instanceof Deno.errors.NotFound) {
      console.warn(`[WARN] ${CONFIG_FILE} not found!`);
    }
  }

  const root_dir =
    isUndefined(conf) || isUndefined(conf.root_dir)
      ? DEFAULT_ROOT_DIR
      : conf.root_dir;
  const port = isUndefined(conf) || isUndefined(conf.port) ? 8085 : conf.port;

  console.log("Using root dir " + root_dir);

  serve(
    (req) => {
      const pathname = new URL(req.url).pathname;
      if (pathname === "/" || pathname.startsWith("/status")) {
        return handle(req);
      }

      return serveDir(req, {
        fsRoot: root_dir,
      });
    },
    { port: port },
  );
})();
