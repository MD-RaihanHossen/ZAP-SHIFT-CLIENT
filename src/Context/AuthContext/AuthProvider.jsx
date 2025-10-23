import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../Firebase";
import { useEffect, useState } from "react";


const AuthProvider = ({children}) => {

    //useState for user 
    const [user, setUser] = useState(null)
  

    //make loader for lodding
    const [loader, setLoader] = useState(true)

    

    //create new user 
    const singup = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email , password)
    }

    //sing in a existing user
    const login = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email , password)
    }

    //logOut user 
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }


    //observer and get user data
    useEffect( () => {
        const unSuscribe = onAuthStateChanged(auth, (curentUser) => {
            if(curentUser && curentUser?.email){
                
                setUser(curentUser)
            }
            else{
                setUser(null)
            }
            setLoader(false)
        })

        return () => {
            unSuscribe()
        }
        
    },[])

    const authInfo = {
        user,
        singup, 
        login,
        logOut,
        loader, 
        setLoader,
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;