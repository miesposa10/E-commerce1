// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../assets/config/firebase";

// const AuthContext = createContext();

// export function AuthProvider ({ children }){

//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         setCurrentUser(user);
//       });
  
//       return unsubscribe;
//     }, []);









//     return(

//         <AuthContext.Provider
//         value = {{
//             currentUser,
//         }}>


//         </AuthContext.Provider>
//     )
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = ()=> {
//     const context = useContext(AuthContext)
//     if (!context) throw new Error('there is no Auth provider');
//     return context;
// }