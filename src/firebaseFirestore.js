// src/firebaseFirestore.js

import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebaseConfig';

const storage = getStorage();

// --- Funções de Gestão de Utilizadores ---

/**
 * Busca todos os documentos da coleção 'users' no Firestore.
 * @returns {Promise<Array>} Uma lista de todos os utilizadores.
 */
export const getAllUsers = async () => {
    try {
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return userList;
    } catch (error) {
        console.error("Erro ao buscar utilizadores:", error);
        return []; // Retorna um array vazio em caso de erro para não quebrar a aplicação
    }
};

/**
 * Atualiza o campo 'status' de um documento de utilizador específico.
 * @param {string} userId - O ID do utilizador a ser atualizado.
 * @param {string} newStatus - O novo status ('approved', 'rejected', etc.).
 * @returns {Promise<{success: boolean, error?: any}>}
 */
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


// --- Funções de Gestão de Campanhas ---

/**
 * Faz o upload de um ficheiro de imagem para o Firebase Storage.
 * @param {File} imageFile - O ficheiro de imagem do input.
 * @returns {Promise<string>} A URL de download da imagem.
 */
const uploadImage = async (imageFile) => {
    const storageRef = ref(storage, `campaigns/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

/**
 * Cria um novo documento de campanha no Firestore com uma imagem.
 * @param {object} campaignData - Os dados da campanha (ex: { title, description }).
 * @param {File} imageFile - O ficheiro de imagem para a campanha.
 * @returns {Promise<{success: boolean, error?: any}>}
 */
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

/**
 * Busca todas as campanhas da coleção 'campaigns' no Firestore.
 * @returns {Promise<Array>} Uma lista de todas as campanhas.
 */
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