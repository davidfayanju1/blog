import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getStorage } from 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBNNiyi5_ywR8DdA9XxeTMJ6bhOuoR1fYo",
    authDomain: "form-validation-2d118.firebaseapp.com",
    projectId: "form-validation-2d118",
    storageBucket: "form-validation-2d118.appspot.com",
    messagingSenderId: "203356842530",
    appId: "1:203356842530:web:b987aa6f9a054caeacf87b"
})


export const auth  = app.auth();
export const db = app.firestore();
// export const storage = getStorage( app );
// export default app;