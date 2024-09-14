import { exec } from "child_process";
import { watch } from "fs";

let isCompiling=false;
let isWaiting=false;
let timeout=false;
let isChanged=false;
setInterval(()=>{
    if(isChanged){
        isChanged=false;
        compile();
    }
},1000);
function timeoutFunc(){
    timeout=false;
    compile();
}
function compile(){
    if(isCompiling){
        isWaiting=true;
        if(!timeout){
            timeout=true;
            setTimeout(timeoutFunc,1000);
        }
        return;
    }
    timeout=false;
    isCompiling=true;
    console.log("compiling");
    exec("compile.sh",(err)=>{
        console.log(`compiled${err? " with error." : ""}`,err);
        isCompiling=false;
    });
}
watch("src",{recursive:true},()=>{
    isChanged=true;
})