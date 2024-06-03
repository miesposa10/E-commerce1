/* eslint-disable react/prop-types */
import { Data } from './Data';

export const ProductList = ({
	// eslint-disable-next-line react/prop-types
	allProducts,
	// eslint-disable-next-line react/prop-types
	setAllProducts,
	// eslint-disable-next-line react/prop-types
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, {...product, quantity: + 1 }]);
	};

	return (
		<div className='container-items'>
			{Data.map(product => (
				<div className='item' key={product.id}>
					<figure className=''>
					<img src={product.image} alt={product.title}  loading="lazy"  className=" w-[100px] h-[200px] object-center mx-6 my-4" />
					</figure>
					<div className='info-product'>
						<h2>{product.title}</h2>
						<p className='price'>${product.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
