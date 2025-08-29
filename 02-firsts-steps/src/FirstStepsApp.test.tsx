import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi} from "vitest";
import { FirstStepsApp } from "./FirstStepsApp";

vi.mock('./shopping-cart/ItemCounter', () => ({
default: (props: unknown) => 
<div data-testid ='firstStepContainer' name={props.name} quantity={props.quantity}></div>
}));

describe('Test in <FirstStepsApp/>', () => {
  test('should match snapshop ', () => {
    const { container } = render(<FirstStepsApp />);
    expect(container).toMatchSnapshot();
    screen.debug();
  });

  test('should render the correct number of ItemCounter components', () => {
    render(<FirstStepsApp/>);
    const itemsCounter = screen.getAllByTestId('firstStepContainer');
    expect(itemsCounter.length).toBe(5)
  });
    
});

  







