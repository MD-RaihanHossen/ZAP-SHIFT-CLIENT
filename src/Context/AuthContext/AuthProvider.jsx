import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../Firebase";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";


const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();

    //useState for user 
    const [user, setUser] = useState(null)
  

    //make loader for lodding
    const [loader, setLoader] = useState(true)

    

    //create new user 
    const singup = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email , password)
    }

      //create a user 
      const createUserWithSocial = () => {
        return signInWithPopup(auth, provider)
      }

      const updateUserProfile = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
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
        createUserWithSocial,
        updateUserProfile,
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;