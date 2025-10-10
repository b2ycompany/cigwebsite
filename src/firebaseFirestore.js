// src/firebaseFirestore.js
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Busca todos os utilizadores da coleção 'users'
export const getAllUsers = async () => {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return userList;
};

// Atualiza o status de um utilizador para 'approved'
export const updateUserStatus = async (userId, newStatus) => {
    const userDoc = doc(db, 'users', userId);
    try {
        await updateDoc(userDoc, { status: newStatus });
        console.log(`Status do utilizador ${userId} atualizado para ${newStatus}`);
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        return { success: false, error };
    }
};