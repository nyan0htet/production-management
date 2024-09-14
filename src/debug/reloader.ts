
const fs=require("fs")  as typeof import('fs');
const nw=require("nw.gui") as typeof import('nw.gui');
export function reloadOnChange(path:string){
    fs.watch(path,(eventType: string, filename: string|null) => {
        if (filename) {
            nw.Window.get().reloadIgnoringCache();
        } else {
            console.log(`filename not provided! Event Type: ${eventType}`);
        }
    })
}