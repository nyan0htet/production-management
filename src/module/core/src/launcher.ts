import { Core } from "../index.js"
import { createEWC } from "../../../util/util.js"
import { Enviroment, ModuleList } from "../../../lib/enviroment.js"

export type LauncherEvent = {
    evType: "mode",
    mode: keyof ModuleList
} | {
    evType: "quick",
    command: "zumen" | "pno" | "nedan"
    data: string
}
type LauncherMenuItemDom=HTMLDivElement&{self:LauncherMenuItem};
type LauncherMenuItem = { display: boolean, name: string, dom: LauncherMenuItemDom, state: "hidden" | "shown",target:AddMenuItem };
type LauncherControl = {
    /** quick access to check menu is existed. */
    menu: { [key: string]: LauncherMenuItem },
    /** wrapped div of html dom. */
    menuDom: HTMLDivElement
    /** menu order which one is first. */
    menuOrder: LauncherMenuItem[],
    /** command bar dom */
    cmdDom: HTMLInputElement
}
export type LauncherOption = {
    eventsListener: (ev: LauncherEvent) => void
}
export type AddMenuItem={
    getName:()=>string,
    name:string
}
function createLauncherUIControl(): [HTMLDivElement, LauncherControl] {
    // main ui
    const retElement = createEWC("div", `${Core.name}-launcher`);
    const topDiv = createEWC("div", `${Core.name}-launcher-top`);
    const cmdDom = document.createElement("input");
    topDiv.append(cmdDom);
    const menuDom = createEWC("div", `${Core.name}-launcher-menu`);
    retElement.append(topDiv);
    retElement.append(menuDom);
    const retControl: LauncherControl = {
        menu: {},
        menuOrder: [],
        cmdDom,
        menuDom,
    };

    return [retElement, retControl];
}
export class Launcher {
    ui!: HTMLDivElement;
    control!: LauncherControl;
    enviroment!: Enviroment;
    eventHandler!: LauncherOption["eventsListener"]
    static async create(enviroment: Enviroment, option: LauncherOption): Promise<Launcher> {
        const retLauncher = new Launcher();
        retLauncher.enviroment = enviroment;
        retLauncher.eventHandler = option.eventsListener;
        [retLauncher.ui, retLauncher.control] = createLauncherUIControl();
        retLauncher.control.menuDom.addEventListener("click", retLauncher.onMenuClick.bind(retLauncher));
        return retLauncher;
    }
    onMenuClick(ev: MouseEvent) {
        const target=ev.target as LauncherMenuItemDom|null;
        if(target){
            console.log(this,target.self);
        }
    }
    addMenuItem(item:AddMenuItem) {
        const itemName=item.name;
            if (!this.control.menu[itemName]) {
                const menuItemDom = createEWC("div", `${Core.name}-launcher-menu-item`) as LauncherMenuItemDom;
                menuItemDom.innerText = item.getName();
                const menuEntry: LauncherMenuItem = { name: itemName, display: false, state: "hidden", dom: menuItemDom ,target:item}
                menuItemDom.self=menuEntry;
                this.control.menuOrder.push(menuEntry);
                this.control.menu[itemName]=menuEntry;
                this.control.menuDom.append(menuItemDom);
            }
    }
}