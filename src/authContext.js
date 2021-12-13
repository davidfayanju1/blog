import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, db } from './firebase';
// import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};


export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');
    const [blogError, setBlogError] = useState('');

    const register = async (name, email, password) => {

       try{
            const res = await auth.createUserWithEmailAndPassword(email, password);
            const user =  res.user;

            await db.collection('users')
            .add({
                uid: user.uid,
                name,
                authProvider: 'local',
                email
            })
            

       }catch(err){
           setSignupError('Account already exists. Try Logging in')  
       }
    }

    const blogPost = async (title, blog) => {

        try{
             
             await db.collection('blogs')
             .add({
                 uid: currentUser.uid, 
                 author: currentUser.displayName,
                 title,
                 blog,
                 createdAt: new Date(),
                 id: uuidv4(),
                 photo: currentUser.photoURL
             })
             
 
        }catch(err){
            console.log(err);
            setBlogError('Error With Blog')  
        }
     }

   

    const login = async (email, password) => {

        try{
            await auth.signInWithEmailAndPassword(email, password);
        }catch (err){
            console.log(err);
            setLoginError('You do not have an account with us');
        }
        
    }

    

    const updateUserProfile = async ( displayName, photoURL ) => {

        try{
            await auth.currentUser.updateProfile({
                displayName,
                photoURL
            })

            console.log(currentUser.displayName)

        }catch(err){
            console.log(err);
        }

    }

    const logout = async () => {

        try{
             await auth.signOut();
        } catch(err){
            console.log(err);
        }

    }

    const deleteAcc = async () => {

        try{
            await auth.currentUser.delete()
        }catch (err){
            console.log(err)
        }
    }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user);
            setLoading(false);
        }

        )
        return unsubscribe;
    }, [])


    

    const value={
        currentUser,
        register,
        login,
        logout,
        loginError,
        updateUserProfile,
        signupError,
        blogPost,
        deleteAcc        
    }
    
    return (
        <authContext.Provider value={value}>
            {!loading && children}
        </authContext.Provider>
    )
};