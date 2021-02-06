import { serve, fs, Colors } from "./deps.ts";

import pugCompile from "./helpers/pugHelper.ts"
import customGet from "./server/index.ts"

declare global {
    let pages : string[]
    interface Window {
        pages: string[]
    }
}

console.error = function(txt) {
    console.log(
        Colors.red("[ERROR] ") + txt
    )
}

window.pages = ["podcast", "events"]
console.log(pages)

const server = serve({ port: 8080})

const index = Deno.cwd() + "/pug/index.pug" 
console.log( "path: " + index)
const indexCompiled = Deno.cwd() + "/dist/index.html" 
fs.existsSync(index) ? pugCompile(index, indexCompiled) : console.error("index.pug not found")

pages.forEach(page => {
    const file = Deno.cwd() + "/pug/" + page + ".pug" 
    const out = Deno.cwd() + "/dist/" + page +  "/index.html" 
    fs.existsSync(file) ? pugCompile(file, out) : console.error("page " + page + " not found")
});

console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const request of server) {
    //console.log(request)
    if(request.method == "GET") {
        customGet(request)
    }
}


