// src/firebaseAuth.js
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Importe o getDoc
import { db } from './firebaseConfig';

const auth = getAuth();

export const signUpAffiliate = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            role: 'affiliate',
            status: 'pending',
            createdAt: new Date()
        });
        console.log("Afiliado registado com sucesso!", user.uid);
        return { success: true, user };
    } catch (error) {
        console.error("Erro no registo:", error);
        return { success: false, error: error.message };
    }
};

// FUNÇÃO ATUALIZADA
export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Após o login, busca o documento do utilizador no Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("Login bem-sucedido!", user.uid, "Função:", userData.role);
            // Retorna o utilizador e os seus dados, incluindo a função (role)
            return { success: true, user: user, userData: userData };
        } else {
            // Caso raro onde o utilizador existe na autenticação mas não no Firestore
            throw new Error("Perfil do utilizador não encontrado.");
        }
    } catch (error) {
        console.error("Erro no login:", error);
        return { success: false, error: error.message };
    }
};

export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("Logout bem-sucedido!");
        return { success: true };
    } catch (error) {
        console.error("Erro no logout:", error);
        return { success: false, error: error.message };
    }
};