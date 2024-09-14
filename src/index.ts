import { reloadOnChange } from "./debug/reloader.js";
import { enviroment, moduleList } from "./lib/enviroment.js";
import { Core } from "./module/core/index.js";

reloadOnChange("app/index.js");
// alert(1233);
document.addEventListener("readystatechange",async (ev)=>{
    const renderDiv=document.getElementById("render") as HTMLDivElement;
    const core=await Core.create(enviroment);
    core.render(renderDiv);
});