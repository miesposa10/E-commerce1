import { useEffect } from "react";



/* eslint-disable react/prop-types */
export const Carrito = (
  {
    allProducts,
    setAllProducts,
    total, setTotal,
    countProducts,
    setCountProducts,
    
  }
)=>{
  const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.id !== product.id
		);

		setTotal(total - product.price * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};


  const increaseQuantity = (product) => {
    const updatedProducts = allProducts.map((item) =>
        item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
    );
    setAllProducts(updatedProducts);
};

const decreaseQuantity = (product) => {
    if (product.quantity > 1) {
        const updatedProducts = allProducts.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setAllProducts(updatedProducts);
    }
};

 // Calcular el total y guardar en localStorage cada vez que se actualiza allProducts
 useEffect(() => {
  const newTotal = allProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
  setTotal(newTotal);
  localStorage.setItem('cart', JSON.stringify(allProducts)); // Guardar el carrito en localStorage
}, [allProducts, setTotal]);

// Cargar el carrito desde localStorage cuando el componente se monte
useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem('cart'));
  if (savedCart) {
    setAllProducts(savedCart);
    const initialTotal = savedCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotal(initialTotal);
    const initialCount = savedCart.reduce((acc, product) => acc + product.quantity, 0);
    setCountProducts(initialCount);
  }
}, [setAllProducts, setTotal, setCountProducts]);

    return(
   
        <>
   
        <div className="bg-white py-6 sm:py-8 lg:py-12" >
  <div className="mx-auto max-w-screen-lg px-4 md:px-8">

    <div className="mb-6 sm:mb-10 lg:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Your Cart</h2>
    </div>
    {allProducts && allProducts.map(product => (
   
    <div key={product.id} className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6" >
  
      <div className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
        <a href="#" className="group relative block h-48 w-60 overflow-hidden bg-gray-100 sm:h-56 sm:w-40">
          <img src={product.image} alt={product.title}  loading="lazy"  className=" w-[130px] h-[200px] object-center mx-3 my-4" />
        </a>

        <div className="flex flex-1 flex-col justify-between py-4">
          <div>
            <a href="#" className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"></a>

            <span className="block text-gray-500">{product.title}</span>
            <span className="block text-gray-500"></span>
          </div>

          <div>
            <span className="mb-1 block font-bold text-gray-800 md:text-lg">${product.price}</span>

          
          </div>
        </div>

        <div className="flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0">
          <div className="flex flex-col items-start gap-2">
            <div className="flex h-12 w-20 overflow-hidden rounded border">
           <p className="w-12 text-center m-auto">
           {product.quantity}
           </p>
          
              <div className="flex flex-col divide-y border-l">
             
                <button className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200" onClick={() => increaseQuantity(product)}>+</button>
                <button className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200" onClick={() => decreaseQuantity(product)}>-</button>
              </div>
            </div>

            <button 	onClick={() => onDeleteProduct(product)}className="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Delete</button>
            
          </div>

          <div className="ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16">
            <span className="block font-bold text-gray-800 md:text-lg">{product.price}</span>
          </div>
        </div>
      </div>
    

    </div>

))}
    <div className="flex flex-col items-end gap-4">
    <button onClick={onCleanCart} className="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Vaciar Carrito</button>
      <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
        <div className="space-y-1">
          <div className="flex justify-between gap-4 text-gray-500">
           subtotal <span>{total}</span>
            
          </div>

          <div className="flex justify-between gap-4 text-gray-500">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex items-start justify-between gap-4 text-gray-800">
            <span className="text-lg font-bold">Total</span>

            <span className="flex flex-col items-end">
              <span className="text-lg font-bold">${total}</span>
              <span className="text-sm text-gray-500">including VAT</span>
            </span>
          </div>
        </div>
      </div>
   
      <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Check out</button>
    </div>

  </div>
</div>
	
        </>
    )
}