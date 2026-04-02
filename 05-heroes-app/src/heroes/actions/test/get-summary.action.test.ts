import { describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { getSummaryAction } from "../get-summary.action";
import { heroApi } from "@/heroes/api/hero.api";

const heroesMockAdapter = new AxiosMockAdapter(heroApi);

describe("getSummaryAction", () => {
  test("should fetch summary and return complete information", async () => {
    heroesMockAdapter.onGet("/summary").reply(200, {
      totalHeroes: 25,
      strongestHero: {
        id: "1",
        name: "Clark Kent",
        slug: "clark-kent",
        alias: "Superman",
        powers: ["Súper fuerza"],
        description: "El Último Hijo de Krypton",
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
      },
      smartestHero: {
        id: "2",
        name: "Bruce Wayne",
        slug: "bruce-wayne",
        alias: "Batman",
        powers: ["Inteligencia genial"],
        description: "El Caballero Oscuro de Gotham",
        strength: 6,
        intelligence: 10,
        speed: 6,
        durability: 7,
        team: "Liga de la Justicia",
        image: "2.jpeg",
        firstAppearance: "1939",
        status: "Active",
        category: "Hero",
        universe: "DC",
      },
      heroCount: 18,
      villainCount: 7,
    });

    const summary = await getSummaryAction();

    expect(summary).toStrictEqual({
      totalHeroes: expect.any(Number),
      strongestHero: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        alias: expect.any(String),
        powers: expect.any(Array),
        description: expect.any(String),
        strength: expect.any(Number),
        intelligence: expect.any(Number),
        speed: expect.any(Number),
        durability: expect.any(Number),
        team: expect.any(String),
        image: expect.any(String),
        firstAppearance: expect.any(String),
        status: expect.any(String),
        category: expect.any(String),
        universe: expect.any(String),
      }),
      smartestHero: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        alias: expect.any(String),
        powers: expect.any(Array),
        description: expect.any(String),
        strength: expect.any(Number),
        intelligence: expect.any(Number),
        speed: expect.any(Number),
        durability: expect.any(Number),
        team: expect.any(String),
        image: expect.any(String),
        firstAppearance: expect.any(String),
        status: expect.any(String),
        category: expect.any(String),
        universe: expect.any(String),
      }),
      heroCount: expect.any(Number),
      villainCount: expect.any(Number),
    });
  });
});
