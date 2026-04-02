import { beforeEach, describe, expect, test } from "vitest"
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { use } from "react";
import type { Hero } from "../types/hero.interface";

const mockHero = {
  id: '1',
  name: 'Iron Man',
} as Hero;

const TestComponent = () => {
  const { favorites, favoriteCount, isFavorite, toggleFavorite } = use(FavoriteHeroContext);
  return (
    <div>
      <div data-testid='favorite-count'>{favoriteCount}</div>

      <div data-testid='favorite-list'>
        {
          favorites.map(hero => (
            <div key={hero.id} data-testid={`hero-${hero.id}`}>{hero.name}</div>
          ))}
      </div>

      <button data-testid='toogle-favorite'
        onClick={() => toggleFavorite(mockHero)}>
        Toogle Favorite
      </button>
      <div data-testid='is-favorite' >
        {isFavorite(mockHero) ? 'Favorite' : 'Not Favorite'}
      </div>

    </div>
  );
};

const renderContextTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>
  );
};

describe('FavoriteHeroContext', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with deafult values', () => {
    renderContextTest();
    expect(screen.getByTestId('favorite-count').textContent).toBe('0');
    expect(screen.getByTestId('favorite-list').children).toHaveLength(0);
  });

  test('should add hero to favorite when toogleFavorite is called with a new hero', () => {
    renderContextTest();
    const button = screen.getByTestId('toogle-favorite');
    fireEvent.click(button);

    expect(screen.getByTestId('is-favorite').textContent).toBe('Favorite');
    expect(screen.getByTestId('favorite-count').textContent).toBe('1');
    expect(screen.getByTestId('hero-1').textContent).toBe('Iron Man');
    expect(localStorage.getItem('favoriteHeroes')).toBe('[{"id":"1","name":"Iron Man"}]');

  });

  test('should remove  hero from favorite when toogleFavorite is called ', () => {
    localStorage.setItem('favoriteHeroes', JSON.stringify([mockHero]));
    renderContextTest();
    const button = screen.getByTestId('toogle-favorite');
    fireEvent.click(button);

    expect(screen.getByTestId('is-favorite').textContent).toBe('Not Favorite');
    expect(screen.getByTestId('favorite-count').textContent).toBe('0');
    expect(localStorage.getItem('favoriteHeroes')).toBe('[]');
  });


});