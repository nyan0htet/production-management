import { Core } from "../module/core/index.js";
import { ProductionSchedule } from "../module/production-schedule/index.js";
export type ModuleList={
    ps:ProductionSchedule
}
export type Enviroment={
    lang:"en"|"jp",
    dLang:"jp",
    modulePath:string,
    moduleAsset:string,
    moduleStyle:string,
    modList:ModuleList,
}

export const enviroment:Enviroment={
    lang:localStorage.getItem("lang") as null|Enviroment['lang'] || "jp",
    dLang:"jp",
    modulePath:"module",
    moduleAsset:"asset",
    moduleStyle:"style.css",
    modList:undefined as unknown as ModuleList
}
export const moduleList:ModuleList={
    ps:await ProductionSchedule.create(enviroment)
}
enviroment.modList=moduleList;
