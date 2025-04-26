import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxD8L28q9ufkbWtdMA24b5evtPEwb-Gak",
    authDomain: "nutrana-4660f.firebaseapp.com",
    projectId: "nutrana-4660f",
    storageBucket: "nutrana-4660f.firebasestorage.app",
    messagingSenderId: "42918318281",
    appId: "1:42918318281:web:66ab9d20d33b5bdddcbd18",
    measurementId: "G-7ZDLE2LB23"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Provedores de autenticação
export const googleProvider = new GoogleAuthProvider();

export const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  prompt: 'consent',
  tenant: process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID || '',
});


export const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');