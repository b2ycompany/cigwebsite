// src/firebaseFirestore.js

import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebaseConfig';

const storage = getStorage();

// --- Funções de Gestão de Utilizadores ---

export const getAllUsers = async () => {
    try {
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return userList;
    } catch (error) {
        console.error("Erro ao buscar utilizadores:", error);
        return [];
    }
};

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

export const updateUserProfile = async (userId, data) => {
    const userDoc = doc(db, 'users', userId);
    try {
        await updateDoc(userDoc, data, { merge: true }); // Usamos merge para não sobrescrever dados existentes
        console.log(`Perfil do utilizador ${userId} atualizado.`);
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return { success: false, error };
    }
};

export const uploadUserDocument = async (userId, file) => {
    if (!file) return { success: false, error: "Nenhum ficheiro selecionado." };
    
    const storageRef = ref(storage, `users/${userId}/documents/${file.name}`);
    try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await updateUserProfile(userId, { documentUrl: downloadURL });

        console.log(`Documento do utilizador ${userId} enviado com sucesso.`);
        return { success: true, url: downloadURL };
    } catch (error) {
        console.error("Erro no upload do documento:", error);
        return { success: false, error };
    }
};


// --- Funções de Gestão de Campanhas ---

const uploadImage = async (imageFile) => {
    const storageRef = ref(storage, `campaigns/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

export const createCampaign = async (campaignData, imageFile) => {
    try {
        const imageUrl = await uploadImage(imageFile);
        const campaignsCol = collection(db, 'campaigns');
        await addDoc(campaignsCol, {
            ...campaignData,
            imageUrl: imageUrl,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Erro ao criar campanha:", error);
        return { success: false, error };
    }
};

export const getCampaigns = async () => {
    try {
        const campaignsCol = collection(db, 'campaigns');
        const campaignSnapshot = await getDocs(campaignsCol);
        const campaignList = campaignSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return campaignList;
    } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
        return [];
    }
};