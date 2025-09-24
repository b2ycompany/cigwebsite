// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// O código agora lê as variáveis de ambiente de forma segura
const firebaseConfig = {
  apiKey: "AIzaSyCO-6WR7KaC7BaebHo9NpJY5752L-s6WCE",
  authDomain: "cig-investimentos.firebaseapp.com",
  projectId: "cig-investimentos",
  storageBucket: "cig-investimentos.firebasestorage.app",
  messagingSenderId: "700646099361",
  appId: "1:700646099361:web:91303ed0df88ee27d963e0"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Exportar os serviços que vamos usar
export const db = getFirestore(app);
export const storage = getStorage(app);