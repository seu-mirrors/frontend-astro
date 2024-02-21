/* Minimal deno server.
 * Place config under the same path /w the excutable.
 * config.toml:
 * port = 8085
 * root_dir = "/xxx"
 */

import { serve } from "http/server.ts";
import { serveDir, serveFile } from "http/file_server.ts";
import { STATUS_CODE } from "http/status.ts";
import { handle } from "./../dist/server/entry.mjs";
import { dirname, fromFileUrl, normalize, SEP } from "path/mod.ts";
import { parse } from "toml/mod.ts";

const PROG_PATH = Deno.args.includes("--is_compiled_binary")
  ? Deno.execPath()
  : fromFileUrl(Deno.mainModule);
const DEFAULT_ROOT_DIR = Deno.args.includes("--is_compiled_binary")
  ? `${dirname(PROG_PATH)}${SEP}client`
  : `${dirname(dirname(PROG_PATH))}${SEP}dist${SEP}client`;
const CONFIG_FILE = `${dirname(PROG_PATH)}${SEP}config.toml`;

interface Conf {
  root_dir: string;
  port: number;
  prod: boolean;
}

let conf: Conf = {
  root_dir: DEFAULT_ROOT_DIR,
  port: 8085,
  prod: false,
};

function exitWithError(errstr: string) {
  console.error(errstr);
  Deno.exit(1);
}

(async () => {
  try {
    conf = parse(await Deno.readTextFile(CONFIG_FILE)) as unknown as Conf;
    conf.root_dir = normalize(`${dirname(PROG_PATH)}/${conf.root_dir}`);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      console.warn(`[WARN] ${CONFIG_FILE} not found!`);
    } else {
      exitWithError("Parse toml failed!");
    }
  }

  console.log("Using root dir " + conf.root_dir);
  console.log("Production flag: " + (conf.prod ? "true" : "false"));

  serve(
    (req: Request) => {
      const pathname = new URL(req.url).pathname;
      if (pathname === "/" || pathname.startsWith("/status")) {
        return handle(req);
      }

      const httpsReq = conf.prod
        ? new Request(req.url.replace(/^http:/, "https:"))
        : req;

      return serveDir(httpsReq, {
        fsRoot: conf.root_dir,
      }).then((r: Response) => {
        if (r.status == STATUS_CODE.NotFound) {
          return serveFile(httpsReq, `${conf.root_dir}${SEP}404.html`);
        } else {
          return r;
        }
      });
    },
    { port: conf.port },
  );
})();
