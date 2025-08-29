import ItemCounter from "./shopping-cart/ItemCounter";


interface ItemInCart {
  productName: string,
  quantity: number
}

const itemsInCart: ItemInCart[] = [
  { productName: 'PS5', quantity: 1 },
  { productName: 'Iphone', quantity: 3 },
  { productName: 'Samsung', quantity: 5 },
  { productName: 'Samsung20', quantity: 5 },
  { productName: 'Samsung78', quantity: 5 },
]
export function FirstStepsApp() {
  return (
    <>
      

        <h1>Shopping-Cart</h1>
        {
          itemsInCart.map(({ productName, quantity }) => (
            <ItemCounter key={productName} name={productName} quantity={quantity} />
          ))
        }
    </>
  );

};








