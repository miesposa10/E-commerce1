/* eslint-disable no-unused-vars */
import { useState } from 'react';


import {GoogleAuthProvider, browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { auth } from '../assets/config/firebase'
import { Link, useNavigate } from 'react-router-dom';


export const Login = ()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 const navigate = useNavigate()


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        await setPersistence(auth, browserLocalPersistence); 
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')// Redirige a la página de inicio
    } catch (error) {
      setError(error.message);
    }
  };

  

  const loginGoogle = ()=>{
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth,googleProvider)
    .then((Result)=>{
      const credencial = GoogleAuthProvider.credentialFromResult(Result);
      const token = credencial.accessToken;
      const user = Result.user
      
      
    })
    .catch((error)=>{
      console.log('error')
    })
    
    }

  return (
    <>
       


    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSignUp} className="space-y-4 md:space-y-6" >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">iniciar sesion</button>
               

                <button className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={loginGoogle}>
                login whith google

              </button>
              </form>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <p className="font-light text-black text-xl">
                  Don’t have an account yet? <Link to="/signup" className='text-blue-500 '>Registrate</Link>
                </p>
            </div>
          </div>
        </div>
      </section>
    </>




  );
}
    


