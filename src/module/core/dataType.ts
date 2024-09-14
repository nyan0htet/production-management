export type CoreErrorCode=0|1|2;
export type ErrorTranslation={eng:string,jp:string};
export type ErrorExplanationEntry={title:ErrorTranslation,message:ErrorTranslation,code:number};
export type CoreErrorExplanation={[key in CoreErrorCode]:ErrorExplanationEntry};