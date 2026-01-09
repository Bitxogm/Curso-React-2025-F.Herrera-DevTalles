import type { Hero } from "./hero.interface";

export interface HeroesResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}

export interface GetHeroesByPageParams {
  page?: number;
  limit?: number;
  publisher?: string;
  search?: string;
  category?: string;
}
