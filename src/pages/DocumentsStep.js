// src/pages/DocumentsStep.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { uploadUserDocument } from '../firebaseFirestore';

const DocumentsStep = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file && user) {
            setIsUploading(true);
            const result = await uploadUserDocument(user.uid, file);
            setIsUploading(false);
            if(result.success) {
                alert('Documento enviado com sucesso! O seu cadastro está completo e em análise.');
                navigate('/dashboard');
            } else {
                alert('Ocorreu um erro ao enviar o documento. Tente novamente.');
            }
        } else {
            alert('Por favor, selecione um ficheiro para enviar.');
        }
    };

    return (
        <div>
            <h2>Documento de Identificação</h2>
            <p>Para finalizar, envie uma foto do seu documento (RG ou CNH, frente e verso, ou documento da empresa).</p>
            <div className="form-group">
                <label>Ficheiro do Documento</label>
                <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} required />
            </div>
            <div className="form-actions">
                <button onClick={handleUpload} className="nav-button" disabled={isUploading}>
                    {isUploading ? 'A Enviar...' : 'Finalizar Cadastro'}
                </button>
            </div>
        </div>
    );
};
export default DocumentsStep;