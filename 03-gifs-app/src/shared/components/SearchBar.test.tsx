import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SearchBar from "./SearchBar";

describe('Test in SearchBar.tsx', () => {

  test('should render searchbar correctly ', () => {
    const { container } = render(<SearchBar onQuery={() => { }} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('should call onQuery with the correctly value after 700ms ', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test' } });
    // await new Promise((resolve) => setTimeout(resolve, 701));
    // Usamos el waitfoer para evaluar algo que sea llamado despues ede un tiempo
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith('Test');
    });
  });

  test('should call only with the last value(debounce)', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'T' } });
    fireEvent.change(input, { target: { value: 'Te' } });
    fireEvent.change(input, { target: { value: 'Tes' } });
    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledWith('Test');
      expect(onQuery).toHaveBeenCalledTimes(1);
    });
  });

  test('should call onQuery when button cicked with the input value', () => {

    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test' } });

    fireEvent.click(button);
    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith('Test');
  });

  test('should the input has the correctly placeholde', () => {
    const value = 'Search Gifs'
    render(<SearchBar onQuery={() => {} } placeholder={value}/>);
    expect(screen.getByPlaceholderText(value)).toBeDefined();
  });

});














