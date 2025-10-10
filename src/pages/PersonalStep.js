// src/pages/PersonalStep.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { updateUserProfile } from '../firebaseFirestore';
import InputMask from 'react-input-mask';

const PersonalStep = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({ phone: '', documentId: '', profession: '', referralCode: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Erro: Utilizador não encontrado. Por favor, faça login novamente.");
            return;
        }
        await updateUserProfile(user.uid, { personalData: formData });
        navigate('/onboarding/address');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Dados Pessoais e Profissionais</h2>
            <div className="form-group">
                <label>Telefone</label>
                <InputMask mask="(99) 99999-9999" value={formData.phone} onChange={handleChange}>
                    {(inputProps) => <input {...inputProps} type="tel" name="phone" required />}
                </InputMask>
            </div>
            <div className="form-group">
                <label>CPF / CNPJ</label>
                <InputMask mask="99.999.999/9999-99" value={formData.documentId} onChange={handleChange}>
                  {(inputProps) => <input {...inputProps} type="text" name="documentId" required />}
                </InputMask>
            </div>
            <div className="form-group">
                <label>Profissão</label>
                <input type="text" name="profession" value={formData.profession} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Recebeu indicação? (Opcional)</label>
                <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange} placeholder="Código do parceiro" />
            </div>
            <div className="form-actions">
                <button type="submit" className="nav-button">Próximo</button>
            </div>
        </form>
    );
};
export default PersonalStep;