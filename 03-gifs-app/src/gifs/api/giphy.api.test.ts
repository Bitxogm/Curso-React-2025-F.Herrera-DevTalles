import { describe, expect, test } from "vitest";
import { giphyApy } from "./giphy.api";


describe('giphyapi', () => {
  const params = giphyApy.defaults.params;

  test('should be configured correctly', () => {
    expect(giphyApy.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');

    expect(params.lang).toBe('es');
    expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);

    expect(params).toStrictEqual({
      lang: 'es',
      api_key: import.meta.env.VITE_GIPHY_API_KEY
    });
  });

});



