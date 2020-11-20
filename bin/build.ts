const [, bundle] = await Deno.bundle('src/main.ts');

await Deno.writeTextFile('bin/main', bundle);