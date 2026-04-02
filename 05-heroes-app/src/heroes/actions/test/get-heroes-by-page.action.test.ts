import { beforeEach, describe, expect, test } from "vitest"
import AxiosMockAdapter from "axios-mock-adapter";

import { getHeroesByPageAction } from "../get-heroes-by-page.action";
import { heroApi } from "@/heroes/api/hero.api";

describe('getHeroesByPageAction ', () => {

  const heroesMockAdapter = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesMockAdapter.reset();
  });

  test('should return default heroes ', async () => {
    // Placeholder test

    heroesMockAdapter.onGet('/').reply(200, {
      heroes: [
        { id: 1, name: 'Hero 1', image: 'hero1.jpg' },
        { id: 2, name: 'Hero 2', image: 'hero2.jpg' },
      ],
      total: 2,
      page: 1,
      limit: 6,
    });

    const response = await getHeroesByPageAction(1);

    expect(response).toStrictEqual(
      {
        heroes: [
          {
            id: 1,
            name: 'Hero 1',
            image: 'http://localhost:3001/images/hero1.jpg'
          },
          {
            id: 2,
            name: 'Hero 2',
            image: 'http://localhost:3001/images/hero2.jpg'
          }
        ],
        total: 2,
        page: 1,
        limit: 6
      }
    )
  });

  test('should return the correct heroes when page is not a number', async () => {
    // Placeholder test
    const responseObject = {
      heroes: [],
      total: 10,
      page: 1,
    };
    heroesMockAdapter.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction('abc' as unknown as number);
    const params = heroesMockAdapter.history.get[0].params;
    // console.log('los paoprams son', params);
    expect(params).toStrictEqual({
      offset: 0,
      limit: 6,
      category: 'all',
    });
  });

    test('should return the correct heroes when page is a string number', async () => {
    // Placeholder test
    const responseObject = {
      heroes: [],
      total: 10,
      page: 1,
    };
    heroesMockAdapter.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction('5' as unknown as number);
    const params = heroesMockAdapter.history.get[0].params;
    // console.log('los params son', params);
    expect(params).toStrictEqual({
      offset: 24,
      limit: 6,
      category: 'all',
    });
  });

      test('should call the api with correct params', async () => {
    // Placeholder test
    const responseObject = {
      heroes: [],
      total: 10,
      page: 1,
    };
    heroesMockAdapter.onGet('/').reply(200, responseObject);

    await getHeroesByPageAction(2, 10, 'heroes');
    const params = heroesMockAdapter.history.get[0].params;
    // console.log('los params son', params);
    expect(params).toStrictEqual({
      offset: 10,
      limit: 10,
      category: 'heroes',
    });
  });






});