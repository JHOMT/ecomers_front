import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCiYMEDhHtBnKsW7keGFuTpLoyIaN4v9g",
    authDomain: "ecommerce-react-b65b9.firebaseapp.com",
    projectId: "ecommerce-react-b65b9",
    storageBucket: "ecommerce-react-b65b9.appspot.com",
    messagingSenderId: "924137699077",
    appId: "1:924137699077:web:76157d088decdc881b696c",
    measurementId: "G-88FSR06RFD"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
