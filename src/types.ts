export type TelMemo = {
    title: string
    date: string
    time: string
    who: string
    sex: "male" | "female" | undefined
    toWho: string
    what: string
    needsCallBack: boolean
    telNumber: number
}
  
export type TelContext = {
      telObj:TelMemo,
      dispatch: React.Dispatch<Action>;
}
export type ValueOf<T> = T[keyof T];

type SubStringAction = {type: keyof Pick<TelMemo,"title"|"date"|"time"|"who"|"toWho"|"what">,payload:string};
type SubNumberAction = {type: keyof Pick<TelMemo,"telNumber">,payload:number};
type SubBooleanAction = {type: keyof Pick<TelMemo,"needsCallBack">,payload:boolean};

export type Action = SubStringAction | SubNumberAction | SubBooleanAction | {type:"sex",payload:"male"|"female"|undefined};
