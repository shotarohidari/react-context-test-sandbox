import { createContext, useContext, useReducer, useState } from "react"
import { Action, TelContext, TelMemo } from "../types";
import { getCurrentDate, getCurrentTime, isDate } from "../util";

const initVal:TelMemo = {
    title:"",
    date:getCurrentDate(),
    time:getCurrentTime(),
    who:"",
    sex:undefined,
    toWho:"",
    what:"",
    needsCallBack: true,
    telNumber: 0
}
export const SampleContext = createContext<TelContext | undefined>(undefined)

export const telReducer = (state:TelMemo,action:Action):TelMemo => {
    switch (action.type) {
        case "title":
            return {...state,title:action.payload}
        case "date":
            if(!isDate(new Date(action.payload))) {
                alert("有効な日付を入力してください");
                return {...state}
            }
            return {...state,date:action.payload}
        case "needsCallBack":
            return {...state,needsCallBack:action.payload};
        case "sex":
            return {...state,sex:action.payload};
        case "telNumber":
            const {payload} = action;
            if(payload.toString().length > 11) {
                alert("有効な桁数でを入力してください");
                return {...state};
            }
            return {...state,telNumber:payload}
        case "toWho":
            return {...state,toWho:action.payload};
        case "who":
            return {...state,who:action.payload};
        case "time":
            return {...state,time:action.payload};
        default:
            throw new Error("存在しないタイプ")
    }
}

export const TelMemoProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
    const [telObj,dispatch] = useReducer(telReducer,initVal);
  return (
    <SampleContext.Provider value={{telObj,dispatch}}>
      {children}
    </SampleContext.Provider>
  )
}

export const useTelMemo = () => {
    const context = useContext(SampleContext);
    if(context === undefined) {
        throw new Error("コンテキス内でこのフックすを使ってください");
    }
    return context;
}

export const useTelTitle = () => {
    const context = useTelMemo();
    const {telObj,dispatch} = context;
    const changeTitle = (newTitle:string) => {
        dispatch({type:"title",payload:newTitle});
    } 
    return {title:telObj.title,changeTitle}
}
