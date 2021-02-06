import { serve } from "./deps.ts";

import customGet from "./server/index.ts"

const server = serve({ port: 8080})

console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const request of server) {
    //console.log(request)
    if(request.method == "GET") {
        customGet(request)
    }
}


