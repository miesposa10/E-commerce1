/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../assets/config/firebase';

export const Header = ({
	allProducts,
	setAllProducts,
	total, setTotal,
	countProducts,
	setCountProducts,
}) => {
	const [active, setActive] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

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



	useEffect(() => {
		const newTotal = allProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
		setTotal(newTotal);
		localStorage.setItem('cart', JSON.stringify(allProducts));
	}, [allProducts, setTotal]);

	// Cargar el carrito desde localStorage cuando la aplicación se inicie
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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigate('/'); // Redirige al usuario a la página de inicio de sesión
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};
	  
	return (

		<>
		<div className='bg-slate-100 w-[100%]'>
		<header className='flex justify-between mx-4 '>
			<h1 className='text-xl'><Link to="/">
			<div className="mb-4 lg:-mt-2">
          <a href="/" className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl" aria-label="logo">
            <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-5 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>

            Tienda
          </a>
        </div>
			</Link></h1>
			<Link className='text-xl' to="/products">Products</Link>
			{currentUser ? (
				<p>
					{currentUser.email}
					<button className='border bg-blue-300 p-2 text-white hover:bg-blue-500 rounded-xl' onClick={handleLogout}>
						Cerrar Sesión
					</button>
				</p>
			) : (
				<h4>
					<Link to="/Login">Iniciar Sesión</Link>
				</h4>
			)}

			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'>
						<span id='contador-productos'>{allProducts.length}</span>
					</div>
				</div>

				<div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
					{allProducts.length ? (
						<>
							<div className='row-product'>
								{allProducts.map(product => (
									<div className='cart-product' key={product.id}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito mx-3'>
												{product.quantity}
											</span>
											<p className='titulo-producto-carrito'>
												{product.title}
											</p>
											<span className='precio-producto-carrito'>
												${product.price}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
										
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
							<button className='btn-clear-all'>
								<Link to="/Carrito">Carrito</Link>
							</button>
						</>
					) : (
						<p className='cart-empty flex justify-between'>El carrito está vacío <svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-close'
						onClick={() => setActive(!active)}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg></p>
					)}
				</div>
			</div>
		</header>
		</div>
		
		</>
		
	);
};
