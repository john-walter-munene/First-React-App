import { useState } from "react";

// Update an item in the shopping cart
// const initialProducts = [{
//     id: 0,
//     name: 'Baklava',
//     count: 1,
//   }, {
//     id: 1,
//     name: 'Cheese',
//     count: 5,
//   }, {
//     id: 2,
//     name: 'Spaghetti',
//     count: 2,
// }];

// function ShoppingCart() {
//   const [products, setProducts] = useState(initialProducts)

//   function handleIncreaseClick(productId) {
//     const updatedProducts = products.map((product) => {
//         if (product.id === productId) return {...product, count: product.count + 1};
//         return product;
//     });

//     setProducts(updatedProducts);
//   }

//   return (
//     <ul>
//       {products.map(product => (
//         <li key={product.id}>
//           {product.name}
//           {' '}
//           (<b>{product.count}</b>)
//           <button onClick={() => {
//             handleIncreaseClick(product.id);
//           }}>
//             +
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export { ShoppingCart };

// Remove an item from the shopping cart 
const initialProductsTwo = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

function ShoppingCartTwo() {
    const [products, setProducts] = useState(initialProductsTwo)

   function handleIncreaseClickTwo(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, count: product.count + 1 };
      } else {
        return product;
      }
    }));
  }

    function handleRemoveClick(productId) {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}{' '}(<b>{product.count}</b>)
          <button onClick={() => handleIncreaseClickTwo(product.id)}>+</button>
          <button onClick={() => handleRemoveClick(product.id)}>–</button>
        </li>
      ))}
    </ul>
  );
}

export { ShoppingCartTwo };