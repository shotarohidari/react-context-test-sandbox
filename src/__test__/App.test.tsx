import { renderHook, act } from '@testing-library/react';
import { useReducer } from 'react';
import { SampleContext,useTelTitle, telReducer, useTelMemo } from '../contexts/SampleContext';
import { TelMemo } from '../types';
import { getCurrentDate, getCurrentTime } from '../util';

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
const TestProvider = ({children}:{children:any}) => {
  const [telObj,dispatch] = useReducer(telReducer,initVal);
  return (
    <SampleContext.Provider value={{telObj,dispatch}}>
      {children}
    </SampleContext.Provider>
  )
}
test('コンテキストのテスト', () => {
  const wrapper = ({ children }:{children:any}) => <TestProvider>{children}</TestProvider>
  const { result } = renderHook(() => useTelTitle(), { wrapper })

  const newTitle = "打ち合わせについて";
  act(() => {
    result.current.changeTitle(newTitle)
  })

  expect(result.current.title).toBe(newTitle);
});
test('コンテキストのテスト2', () => {
  const wrapper = ({ children }:{children:any}) => <TestProvider>{children}</TestProvider>
  const { result } = renderHook(() => useTelMemo(), { wrapper })
  act(() => {
    result.current.dispatch({type:"needsCallBack",payload:false});
  })
  expect(result.current.telObj.needsCallBack).toBe(false);
});
test('コンテキストのテスト3', () => {
  const wrapper = ({ children }:{children:any}) => <TestProvider>{children}</TestProvider>
  const { result } = renderHook(() => useTelMemo(), { wrapper })
  act(() => {
    result.current.dispatch({type:"sex",payload:undefined});
  })
  expect(result.current.telObj.sex).toBe(undefined);
});
test("コンテキストのテスト4", () => {
  const wrapper = ({ children }:{children:any}) => <TestProvider>{children}</TestProvider>
  const { result } = renderHook(() => useTelMemo(), { wrapper });

  const newStrDate = "2022/11/15";
  act(() => {
    result.current.dispatch({type:"date",payload:newStrDate});
  })
  expect(result.current.telObj.date).toBe(newStrDate);
})

