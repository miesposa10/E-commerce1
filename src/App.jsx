
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./assets/config/firebase";
import { Barra } from "./components/Navbar";
import { Carrito } from "./components/ShopinngCard";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
console.log(currentUser)
  return (
    <>
      <BrowserRouter>
      <Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
				user={currentUser} 
			/>
        <Routes>
          <Route path="/" element={<Home allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts} user={currentUser} />} />
          <Route path="/Navbar" element={<Barra user={currentUser} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/Carrito" element={<Carrito  allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts} />} />

            <Route path="/products" element={<ProductList allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}/>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
