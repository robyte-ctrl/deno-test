import { Config } from './config.ts';
import { serve } from "https://deno.land/std@0.78.0/http/server.ts";

interface Vars {
  hostname: string;
  port: number;
  name: string;
}

const config = await Config.fromFS<Vars>();

const hostname = config.get('hostname');
const port = config.get('port');

const s = serve({ hostname, port });

console.log(`listening on http://${ hostname }:${ port }`);

for await (const req of s) {
  const { method, url } = req;

  console.log(`${ method } ${ url }`);

  req.respond({ body: "Hello World\n" });
}
