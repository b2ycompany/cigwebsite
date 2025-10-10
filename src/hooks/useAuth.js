// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Utilizador está logado, busca os dados do Firestore
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData(data);
                    setUserRole(data.role);
                }
                setUser(currentUser);
            } else {
                // Utilizador está deslogado
                setUser(null);
                setUserData(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        // Limpeza: desinscreve do "ouvinte" quando o componente é desmontado
        return () => unsubscribe();
    }, []);

    return { user, userData, userRole, loading };
};