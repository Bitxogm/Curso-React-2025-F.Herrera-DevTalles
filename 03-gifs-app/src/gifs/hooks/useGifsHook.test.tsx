import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from "vitest";
import useGifs from "./useGifsHook";
import * as getGifsByQueryAction from '../actions/get-gifs-by-query.action';


describe('useGifs', () => {

  test('should return default values and Methods', () => {
    // Evaluamos el valor ininxcial y los metodos
    const { result } = renderHook(() => useGifs());
    expect(result.current.gifs.length).toBe(0);
    expect(result.current.gifs).toEqual([]);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.previousTerms).toEqual([]);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
    expect(result.current.handleSearch).toBeInstanceOf(Function);
    expect(result.current.handleTermClicked).toBeInstanceOf(Function);
  });

  test('should return a list of gifs', async () => {
    // Evaluar gifs que retorne 5, handleSearch
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('goku');
    });

    expect(result.current.gifs.length).toBe(5)
  });

  test('should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked('vegeta');
    });

    expect(result.current.gifs.length).toBe(5)
  });

  test('should return a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleTermClicked('vegeta');
    });
    expect(result.current.gifs.length).toBe(5);

    vi.spyOn(getGifsByQueryAction, 'getGifsByQuery').mockRejectedValue(new Error(`This is an error`));

  });

  });







