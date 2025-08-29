import type { CSSProperties } from "react";

interface Address {
  zipCode: string;
  country: string;
}

const name: string = 'BlackStar';
const alias: string = 'Void';
const favoriteGames: string[] = ['kaka', 'kuku', 'koko'];
const isActive: boolean = true;
const address: Address= {
  zipCode : '65656',
  country: 'Apatrida',
}

const stylesParagraph: CSSProperties = {
  backgroundColor : 'rebeccapurple',
  padding: 20,
  borderRadius: 15
}

const MyAwesomeApp = () => {
  return (
    <>
    <div data-testid='div-test' >
      <h1 data-testid="h1-test-id">Me llamo {name}</h1>
      <h3>{favoriteGames.join(' + ')}</h3>u
      <h2>Me llaman {alias}</h2>
      <h1>{isActive ? 'Active' : 'Inactive'}</h1>
      <p className="my-class">Eoooooooo</p>
      <p style={stylesParagraph } >{JSON.stringify(address)}</p>
      <h2>{address.zipCode}</h2>
    </div>

    </>
  );
};
export default MyAwesomeApp;



