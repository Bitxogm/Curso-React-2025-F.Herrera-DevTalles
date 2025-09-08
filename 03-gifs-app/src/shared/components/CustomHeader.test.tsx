import { describe, expect, test,  } from "vitest";
import { render, screen,  } from "@testing-library/react";
import CustomHeader from './CustomHeader';

describe('CustomHeader', () => {
  const title = "Test title";
  const description = "Test description"

  test('should render the title correctly', () => {
    render(<CustomHeader title={title} />);
    screen.debug(); //Para ver que se esta renderizando en este momento
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.innerHTML).toBe(title);
    expect(screen.getByText(title)).toBeDefined(); //Test del  Curso , sin las dos lineas anteriroes
  });
  
  test('should render the description when provided', () => {
    render(<CustomHeader title={title}  description={description} />);
    screen.debug(); //Para ver que se esta renderizando en este momento
    const p = screen.getByRole('paragraph');
    expect(p.innerHTML).toBe(description)
    expect(screen.getByText(description)).toBeDefined(); //Test del  Curso , sin las dos lineas anteriroes
  });

  test('should not render description when not provided', () => {
    // No podemos usar el screen , cuando lo usamos , el elemeno tiene que existir.
    // No podemos evaluar con el screen la no existencia de un elemento .
    // Para hacer esta evaluacion debemos tomar el container
    const {container } = render( <CustomHeader title={title} /> );
    const divElement = container.querySelector('.content-center'); //Tomamos la clase del elemento Div,content-center,con . para referenciar la Class.
    const p = divElement?.querySelector('p');
    expect(p).toBeNull();
  });
  
});






