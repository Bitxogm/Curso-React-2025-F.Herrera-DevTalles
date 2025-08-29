import { fireEvent, render, screen,   } from "@testing-library/react";
import { describe, expect, test } from "vitest"
import ItemCounter from "./ItemCounter";


describe('Test in <ItemCounter />', () => { 
  test('should render with deafult values  ', () => {
    const nameTest = 'Test item'
    render(<ItemCounter name={nameTest} />);
    screen.debug();
    expect(screen.getAllByText(nameTest)).toBeDefined();
    expect(screen.getAllByText(nameTest)).not.toBeNull();
  });
 
  test('should render with custom quantity  ', () => {
    const nameTest = 'Test item'
    const quantity = 1
    render(<ItemCounter name={nameTest} quantity={quantity} />);
    expect(screen.getByText(`${quantity}`)).toBeDefined();
  });
  
  test('should increase count when +1 button is pressed', () => {
    const initialQuantity = 1
    render(<ItemCounter name={`test item`} quantity={initialQuantity} />);
    const buttonAdd = screen.getByText('+1');
    //Tenemos que testear cuando se dispara el evento.
    fireEvent.click(buttonAdd);
    expect(screen.getByText('2')).toBeDefined();
  });
  

  test('should increase count when -1 button is pressed', () => {
    const initialQuantity = 5
    render(<ItemCounter name={`test item`} quantity={initialQuantity} />);
    const  buttonSubstract= screen.getByText('-1');
    
    //Tenemos que testear cuando se dispara el evento.
    fireEvent.click(buttonSubstract);
    expect(screen.getByText('4')).toBeDefined();
  });
  
  test('should not decrease  count when -1 button is pressed and quantity is 1', () => {
    const initialQuantity = 1
    render(<ItemCounter name={`test item`} quantity={initialQuantity} />);
    const  buttonSubstract= screen.getByText('-1');
    //Tenemos que testear cuando se dispara el evento.
    fireEvent.click(buttonSubstract);
    expect(screen.getByText('1')).toBeDefined();
  });
  

});


  
  
  
