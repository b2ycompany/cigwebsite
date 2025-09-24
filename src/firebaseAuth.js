// src/firebaseAuth.js
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from './firebaseConfig'; // A nossa configuração do Firestore

const auth = getAuth();

// Função para registar um novo afiliado
export const signUpAffiliate = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Após criar o utilizador na autenticação, guarda os dados adicionais no Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            role: 'affiliate', // Papel padrão
            status: 'pending', // Estado inicial pendente de aprovação
            createdAt: new Date()
        });
        
        console.log("Afiliado registado com sucesso!", user.uid);
        return { success: true, user };

    } catch (error) {
        console.error("Erro no registo:", error.message);
        return { success: false, error: error.message };
    }
};

// Função para fazer login
export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login bem-sucedido!", userCredential.user.uid);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Erro no login:", error.message);
        return { success: false, error: error.message };
    }
};

// Função para fazer logout
export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("Logout bem-sucedido!");
        return { success: true };
    } catch (error) {
        console.error("Erro no logout:", error.message);
        return { success: false, error: error.message };
    }
};