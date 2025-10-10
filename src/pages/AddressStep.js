// src/pages/AddressStep.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { updateUserProfile } from '../firebaseFirestore';

const AddressStep = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({ cep: '', street: '', number: '', city: '', state: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Erro: Utilizador não encontrado.");
            return;
        }
        await updateUserProfile(user.uid, { address: formData });
        navigate('/onboarding/documents');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Endereço</h2>
            <div className="form-group">
                <label>CEP</label>
                <input type="text" name="cep" value={formData.cep} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Rua / Avenida</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Número</label>
                <input type="text" name="number" value={formData.number} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Cidade</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
             <div className="form-group">
                <label>Estado</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-actions">
                <button type="submit" className="nav-button">Próximo</button>
            </div>
        </form>
    );
};
export default AddressStep;