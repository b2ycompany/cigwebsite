// src/firebaseFirestore.js
import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebaseConfig';

const storage = getStorage();

// --- Funções de Utilizador ---
export const getAllUsers = async () => { /* ... (código existente) ... */ };
export const updateUserStatus = async (userId, newStatus) => { /* ... (código existente) ... */ };

// --- NOVAS Funções de Campanha ---

// Upload de imagem para o Firebase Storage
const uploadImage = async (imageFile) => {
    const storageRef = ref(storage, `campaigns/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

// Cria uma nova campanha no Firestore
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

// Busca todas as campanhas
export const getCampaigns = async () => {
    const campaignsCol = collection(db, 'campaigns');
    const campaignSnapshot = await getDocs(campaignsCol);
    const campaignList = campaignSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return campaignList;
};