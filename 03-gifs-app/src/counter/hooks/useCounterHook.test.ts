import { describe, expect, test } from "vitest";
import {useCounter }from "./useCounterHook";
import { act, renderHook } from "@testing-library/react";

describe('useCounterHook', () => { 

  test('should initialize with default value of 10 ', () => {
    const { result } = renderHook(( ) => useCounter());
    expect(result.current.counter).toBe(10);
  });
  
  test('should initialize with value 20 ', () => {
    const initialValue = 20
    const { result } = renderHook(( ) => useCounter(initialValue));
    expect(result.current.counter).toBe(initialValue);
  });
  
  test('should increment counter when handleAdd is called or pressed ', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(11);
  });
  
  test('should decrement counter when handleSubstract is called or pressed ', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.handleSubstract();
    });
    expect(result.current.counter).toBe(9);
  });
  
  test('should reset to initialValue the counter when handleReset is called or pressed ', () => {
    
    const { result } = renderHook(() => useCounter());
    const initialValue = 10
    
    act(() => {
      result.current.handleSubstract();
      result.current.handleSubstract();
      result.current.handleSubstract();
      result.current.handleSubstract();
    });
    expect(result.current.counter).toBe(6);
    
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(7)
    
    act(() => {
      result.current.handleReset();
    });
    expect(result.current.counter).toBe(initialValue);
  });
});
  




  





