import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

describe("hero.api.test.ts", () => {
  test("should be configured testing server", () => {
    // Placeholder test
    
    expect(heroApi).toBeDefined();
    
    expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
    expect(BASE_URL).toContain("3001");

  });
});