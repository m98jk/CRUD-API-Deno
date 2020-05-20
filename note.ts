import {
  dayOfYear,
  currentDayOfYear,
} from "https://deno.land/std/datetime/mod.ts";

console.log(dayOfYear(new Date("2020-02-02")));
console.log(currentDayOfYear());

const greting: string = "hello";
console.log(greting);

//creating new files with deno

const encoder = new TextEncoder();

const greetText = encoder.encode("Hello \n Mohammed");

await Deno.writeFile("hi.txt", greetText);

/// read files

let file = await Deno.open("hi.txt");
await Deno.copy(file, Deno.stdout);
file.close();

//// simple server

import { serve } from "https://deno.land/std/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
