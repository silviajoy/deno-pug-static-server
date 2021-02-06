import { ServerRequest } from "https://deno.land/std@0.85.0/http/server.ts";
import * as fs  from "https://deno.land/std@0.85.0/fs/mod.ts"

async function readDocument(filepath : string): Promise<string> {
    console.log("Reading " + Deno.cwd() + filepath + "...")
    return Deno.readTextFile(Deno.cwd() + filepath)
}

function elaborateUrl(url : string) : {path : string, args : string[] | undefined} {
    console.log("Interpreting url  " + url + "...")
    let path = url.split("?")[0]
    let args : "" | string[] | undefined
    args = (url.split("?")[1] && url.split("?")[1].split("&"))
    args = args === "" ? undefined : args
    console.log("filepath " + path + "\nargs: " + args)
    let objectUrl : {path : string, args : string[] | undefined} = {path, args}
    return objectUrl
}

const customGet = (request : ServerRequest) => {
    let url = elaborateUrl(request.url)
    let filepath = "/dist" + url.path
    //const args = url.args
    
    const isFile = filepath.includes(".")
    
    filepath += !isFile && '/index.html' || ''
    
    fs.exists("."+filepath).then((result : boolean) => {
        if(result) {
            readDocument(filepath).then((response) => {
                request.respond({ status: response && 200 ||  500, body: response || "internal error" })
            })
        } else {
            request.respond({ status: 404, body: "not found" });
        }
    })
}

export default customGet