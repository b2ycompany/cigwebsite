// src/pages/AdminDashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import { getAllUsers, updateUserStatus } from '../firebaseFirestore';
import './AdminDashboard.css'; // Novo CSS

const AdminDashboard = () => {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending'); // Filtro inicial

    const fetchAffiliates = useCallback(async () => {
        setLoading(true);
        const allUsers = await getAllUsers();
        // Filtra para mostrar apenas afiliados (e não outros admins, por exemplo)
        setAffiliates(allUsers.filter(user => user.role === 'affiliate'));
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAffiliates();
    }, [fetchAffiliates]);

    const handleUpdateStatus = async (userId, newStatus) => {
        const result = await updateUserStatus(userId, newStatus);
        if (result.success) {
            // Recarrega a lista para mostrar a alteração
            fetchAffiliates(); 
        } else {
            alert('Erro ao atualizar o status.');
        }
    };

    const filteredAffiliates = affiliates.filter(aff => aff.status === filter);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Painel do Administrador</h1>
                <p>Gestão de Afiliados</p>
            </header>
            
            <div className="dashboard-content">
                <div className="filter-tabs">
                    <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pendentes</button>
                    <button onClick={() => setFilter('approved')} className={filter === 'approved' ? 'active' : ''}>Aprovados</button>
                </div>

                <div className="affiliate-list">
                    {loading ? <p>A carregar afiliados...</p> : (
                        filteredAffiliates.length > 0 ? filteredAffiliates.map(affiliate => (
                            <div key={affiliate.id} className="affiliate-card">
                                <div className="card-header">
                                    <h3>{affiliate.name}</h3>
                                    <span className={`status-badge status-${affiliate.status}`}>{affiliate.status}</span>
                                </div>
                                <div className="card-body">
                                    <p><strong>E-mail:</strong> {affiliate.email}</p>
                                    <p><strong>Data de Cadastro:</strong> {new Date(affiliate.createdAt.seconds * 1000).toLocaleDateString()}</p>
                                </div>
                                {affiliate.status === 'pending' && (
                                    <div className="card-actions">
                                        <button className="btn btn-approve" onClick={() => handleUpdateStatus(affiliate.id, 'approved')}>Aprovar</button>
                                        <button className="btn btn-reject" onClick={() => handleUpdateStatus(affiliate.id, 'rejected')}>Rejeitar</button>
                                    </div>
                                )}
                            </div>
                        )) : <p>Nenhum afiliado encontrado neste filtro.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;