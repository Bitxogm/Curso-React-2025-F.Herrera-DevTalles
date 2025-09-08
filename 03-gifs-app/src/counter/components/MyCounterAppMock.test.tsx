import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi, } from "vitest";
import MyCounterApp from "./MyCounterApp";
import { useCounter } from "../hooks/useCounterHook";

const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();



useCounter
// Traer el component:
vi.mock('../hooks/useCounterHook', () => ({
  useCounter: () => ({
    counter: 20,
    handleAdd: handleAddMock,
    handleSubstract: handleSubstractMock,
    handleReset: handleResetMock
  })
}));

describe('MyCounterAppMock', () => {

  test('should render the component', () => {
    render(<MyCounterApp />);
    screen.debug();
    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(`Counter : 20`);
    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
  });

  test('should call handleAdd when button is clicked', () => {
    render(<MyCounterApp />);

    const button = screen.getAllByRole('button', { name: '+1' });
    fireEvent.click(button[0] as HTMLElement);
    expect(handleAddMock).toHaveBeenCalled();
    expect(handleSubstractMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();

  });
});







