
import { describe, expect, test } from "vitest";
import MyAwesomeApp from "./MyAwesomeApp";
import { render, screen } from "@testing-library/react";

describe('Test in <MyAwesomeApp/> ', () => {
    test('should render firstName  and lastName', () => { 
        const { container }= render(<MyAwesomeApp />)
        render(<MyAwesomeApp/>);
        // screen.debug();

        const h1 = container.querySelector('h1');
        const h2 = container.querySelector('h2');
        
        console.log(h1);
        console.log(h1?.innerHTML);
        expect(h1?.innerHTML).toBe('Me llamo BlackStar');
        expect(h1?.innerHTML).toContain('Me ');
        expect(h2?.innerHTML).toContain('lla')
     });
    test('should render firstName  and lastName-screen', () => { 
        render(<MyAwesomeApp />);
        screen.debug();
        const h1 = screen.getByTestId('h1-test-id');
        expect(h1.innerHTML).toContain('Me llamo')
     });

     test('should match snapshot ', () => {
        const { container } = render(<MyAwesomeApp />);
        expect(container).toMatchSnapshot();
    });
    
    test('should match snapshot ', () => {
        render(<MyAwesomeApp />);
        expect(screen.getByTestId('div-test')).toMatchSnapshot();
    });
       
     
});
