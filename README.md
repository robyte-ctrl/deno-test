# deno test

just testing what can be achieved with deno

## running

to run the app follow these steps:

1. inside `config` make a copy of `default.ts.example` and rename it to `default.ts`
2. run `deno run --allow-env --allow-read --allow-net src/main.ts` in the shell

## building

the app can also be built (bundled) via one of the following steps:

* run `deno bundle src/main.ts bin/main` in the shell
* run `deno run --allow-all bin/build.ts` in the shell

after this you can discard `src` and run the app from the bundle via `deno run --allow-env --allow-read --allow-net bin/main`