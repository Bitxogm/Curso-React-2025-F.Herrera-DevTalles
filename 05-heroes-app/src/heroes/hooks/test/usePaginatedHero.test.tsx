import type { PropsWithChildren } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePaginatedHero } from "../usePaginatedHero";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";

vi.mock("@/heroes/actions/get-heroes-by-page.action", () => ({
  getHeroesByPageAction: vi.fn()
}));

const mockHeroesByPageAction = vi.mocked(getHeroesByPageAction);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const tanStackCustomProvider = () => {

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
};

describe("usePaginatedHero", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
    mockHeroesByPageAction.mockImplementation(() => new Promise(() => { }));
  });

  test("should return the initial state (isLoading)", () => {

    const { result } = renderHook(() => usePaginatedHero(1, 10, "All"), {
      wrapper: tanStackCustomProvider()
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  test('should return success state with data when API call succeeds', async () => {

    const mockHeroesData = {
      total: 20,
      pages: 2,
      heroes: []
    }
    mockHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => usePaginatedHero(1, 10, "All"), {
      wrapper: tanStackCustomProvider()
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe('success');
    expect(mockHeroesByPageAction).toHaveBeenCalledWith(1, 10, "All");
    expect(result.current.data).toEqual(mockHeroesData);
  });

});

