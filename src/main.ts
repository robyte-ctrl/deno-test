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
const name = config.get('name');

const server = serve({ hostname, port });

console.log(`listening on http://${ hostname }:${ port }`);

for await (const request of server) {
  const { method, url } = request;

  console.log(`${ method } ${ url }`);

  request.respond({ body: `hello from ${ name }\n` });
}
