import { Enviroment } from "../../lib/enviroment.js";
import { loadCss, unloadCss } from "../../util/util.js";
import { CoreErrorCode } from "./dataType";
import { Launcher } from "./src/launcher.js";

export class Core{
    ui!:HTMLDivElement;
    launcher!:Launcher
    childDiv!:HTMLDivElement;
    enviroment!:Enviroment;
    static name="core";
    static async create(enviroment:Enviroment):Promise<Core>{
        const retCore=new Core();
        retCore.enviroment=enviroment;
        loadCss(enviroment,Core.name);
        retCore.childDiv=document.createElement("div");
        return retCore;
    }
    async render(renderDiv:HTMLDivElement):Promise<CoreErrorCode>{
        this.ui=renderDiv;
        this.launcher=await Launcher.create(this.enviroment,{eventsListener:()=>{}});
        this.launcher.addMenuItem(this.enviroment.modList.ps);
        renderDiv.append(this.launcher.ui);
        return 0;
    }
    async destory():Promise<CoreErrorCode>{
        unloadCss(Core.name);
        return 0;
    }
}