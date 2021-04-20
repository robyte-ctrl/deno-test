import { Config } from './config.ts';
// import { serve } from 'https://deno.land/std/http/server.ts';
import { opine } from 'https://deno.land/x/opine/mod.ts';
import { proxy } from 'https://deno.land/x/opineHttpProxy/mod.ts';

interface Vars {
  hostname: string;
  port: number;
  name: string;
}

const config = await Config.fromFS<Vars>();

const hostname = config.get('hostname');
const port = config.get('port');
const name = config.get('name');

// const server = serve({ hostname, port });

// console.log(`listening on http://${ hostname }:${ port }`);

const app = opine();

app.use('/conf', proxy('http://localhost:3030'));
app.use('/shop', proxy('http://localhost:3031'));
app.use('/designer', proxy('http://localhost:8080'));

const server = app.listen(port, () => {
  console.log(`proxy listening on http://0.0.0.0:${ port }`);
});

// for await (const request of server) {
//   const { method, url, body, headers } = request;

//   console.log(`${ method } ${ url }`);

//   if (url.startsWith('/shop')) {
//     fetch({ url, body, method, headers })
//   }
// }
