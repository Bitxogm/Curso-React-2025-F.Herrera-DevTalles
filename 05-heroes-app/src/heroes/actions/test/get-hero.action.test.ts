import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { getHeroAction } from "../get-hero.action";
import { heroApi } from "@/heroes/api/hero.api";

const heroesMockAdapter = new AxiosMockAdapter(heroApi);

describe("get-hero.action", () => {
  beforeEach(() => {
    heroesMockAdapter.reset();
  });

  test("should fetch hero data and return with complete URL", async () => {
    heroesMockAdapter.onGet(/clark-kent$/).reply(200, {
      id: "1",
      name: "Clark Kent",
      slug: "clark-kent",
      alias: "Superman",
      powers: [
        "Súper fuerza",
        "Vuelo",
        "Visión de calor",
        "Visión de rayos X",
        "Invulnerabilidad",
        "Súper velocidad",
      ],
      description:
        "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
      strength: 10,
      intelligence: 8,
      speed: 9,
      durability: 10,
      team: "Liga de la Justicia",
      image: "1.jpeg",
      firstAppearance: "1938",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });

    const result = await getHeroAction("clark-kent");
    const resultImage = result.image;
    expect(resultImage).toBe("http://localhost:3001/images/1.jpeg");
    expect(resultImage).toContain("http");

    expect(result).toStrictEqual({
      id: "1",
      name: "Clark Kent",
      slug: "clark-kent",
      alias: "Superman",
      powers: [
        "Súper fuerza",
        "Vuelo",
        "Visión de calor",
        "Visión de rayos X",
        "Invulnerabilidad",
        "Súper velocidad",
      ],
      description:
        "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
      strength: 10,
      intelligence: 8,
      speed: 9,
      durability: 10,
      team: "Liga de la Justicia",
      image: "http://localhost:3001/images/1.jpeg",
      firstAppearance: "1938",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });
  });

  test("should handle errors if hero is not found", async () => {
    heroesMockAdapter.onGet(/unknown-hero$/).reply(404);

    const idSlug = "unknown-hero";
    await getHeroAction(idSlug).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe("Request failed with status code 404");
    });
  });
});
