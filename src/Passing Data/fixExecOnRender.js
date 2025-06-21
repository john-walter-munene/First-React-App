//  1. Reference Style (Closure Inside Inline Arrow Function)

function ProductList({ products }) {
  const handleBuy = (id) => {
    console.log('Buying product with ID:', id);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          {/* Inline arrow function captures product.id */}
          <button onClick={() => handleBuy(product.id)}>Buy</button>
        </div>
      ))}
    </div>
  );
}

//  2. Currying Style (Pre-Curried Handler)

function ProductListTwo({ products }) {
  // Curried function returns a function
  const handleBuy = (id) => () => {
    console.log('Buying product with ID:', id);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          {/* handleBuy(product.id) returns the function, not executes it */}
          <button onClick={handleBuy(product.id)}>Buy</button>
        </div>
      ))}
    </div>
  );
}
