import { pug, fs, Colors } from "../deps.ts";

const compilePug = (inPath : string, outPath : string) => {
    const reader = Deno.readTextFile(inPath)
    reader.then((pugString) => {
        console.log("Compiling pug file " + inPath + "...")
        const htmlString = pug.compile(pugString, {filename: inPath})();
        console.log("Writing html " + outPath + "...")
        fs.ensureFile(outPath).then(() => {
            const write = Deno.writeTextFile(outPath, htmlString)    
            write.then(() => console.log(Colors.green("compiled ") + outPath))
        })
      })
}

export default compilePug