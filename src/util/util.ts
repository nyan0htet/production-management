import { Enviroment } from "../lib/enviroment";

/**
 * create html element with class
 * @param tag - html tag type
 * @param className - class to add
 * @returns 
 */
export function createEWC<K extends keyof HTMLElementTagNameMap>(tag:K,className:string[]|string):HTMLElementTagNameMap[K]{
    const retElement=document.createElement(tag);
    if(Array.isArray(className)){
        retElement.classList.add(...className);
    }else{
        retElement.classList.add(className);
    }
    return retElement;
}
export function loadCss(enviroment:Enviroment,name:string){
    const styleDom=document.createElement("link");
    styleDom.id=`${name}-style`;
    styleDom.rel="stylesheet";
    styleDom.href=`${enviroment.moduleAsset}/${name}/${enviroment.moduleStyle}`;
    document.head.append(styleDom);
}
export function unloadCss(name:string){
    const cssDom=document.getElementById(`${name}-style`);
    if(cssDom){
        cssDom.remove();
    }
}