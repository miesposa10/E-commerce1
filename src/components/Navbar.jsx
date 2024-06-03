/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */



import { useState } from 'react';
import { Link } from 'react-router-dom';



export const Barra = ({ currentUser }) => {

 

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  return (
    <header className=" bg-amber-300 w-full h-100px flex justify-between items-center ">
      <div className="flex justify-between ">

        
        <button className="   bg-slate- 400">

          <div role="img" aria-label="Buscar" className="nav-icon-search"></div>
          <nav className="  ">

            <button className='mx-6' onClick={toggleMenu}> Menu</button>
            {menuAbierto && (
              <ul className="flex justify-end gap-20   flex-col">
                <li>Categoria</li>
                <li><a href="https://www.mercadolibre.com.co/ofertas#nav-header">Ofertas</a></li>
                <li><a href="https://www.mercadolibre.com.co/gz/home/navigation#nav-header">Historial</a></li>
                <li><a href="https://www.mercadolibre.com.co/syi/core/list#nav-header">Vender</a></li>
              </ul>


            )}


          </nav>
         
        </button>


        
      </div>




      <div className=' flex h-8  justify-between '>
       {currentUser ? (<Link to='/Login'> cerrar sesion </Link>  ):(<Link to='/Login'> iniciar sesion </Link>  )} 
          
       <Link to='/Carrito' >
          <svg 
          
          
          xmlns="http://www.w3.org/2000/svg" width="100" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg></Link>

        </div>



    </header>
  );
}