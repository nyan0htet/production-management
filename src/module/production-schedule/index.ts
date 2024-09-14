import { Enviroment } from "../../lib/enviroment";
import { loadCss } from "../../util/util.js";

const name="production-schedule";
const nameStr={en:"Production Schedule",jp:"工程表"}
export class ProductionSchedule{
    enviroment!:Enviroment;
    name=name;
    static async create(enviroment:Enviroment):Promise<ProductionSchedule>{
        const retPS=new ProductionSchedule();
        retPS.enviroment=enviroment;
        loadCss(enviroment,name);
        return retPS;
    }
    getName():string{
        return nameStr[this.enviroment.lang] || nameStr[this.enviroment.dLang];
    }
}