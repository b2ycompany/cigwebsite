// src/pages/AdminDashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import { getAllUsers, updateUserStatus, createCampaign, getCampaigns } from '../firebaseFirestore';
import './AdminDashboard.css';

// Componente para a lista de afiliados
const AffiliateManager = () => {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');

    const fetchAffiliates = useCallback(async () => {
        setLoading(true);
        const allUsers = await getAllUsers();
        setAffiliates(allUsers.filter(user => user.role === 'affiliate'));
        setLoading(false);
    }, []);

    useEffect(() => { fetchAffiliates(); }, [fetchAffiliates]);

    const handleUpdateStatus = async (userId, newStatus) => {
        await updateUserStatus(userId, newStatus);
        fetchAffiliates();
    };

    const filteredAffiliates = affiliates.filter(aff => aff.status === filter);

    return (
        <div>
            <div className="filter-tabs">
                <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pendentes</button>
                <button onClick={() => setFilter('approved')} className={filter === 'approved' ? 'active' : ''}>Aprovados</button>
                <button onClick={() => setFilter('rejected')} className={filter === 'rejected' ? 'active' : ''}>Rejeitados</button>
            </div>
            <div className="affiliate-list">
                {loading ? <p>A carregar afiliados...</p> : (
                    filteredAffiliates.length > 0 ? filteredAffiliates.map(affiliate => (
                        <div key={affiliate.id} className="affiliate-card">
                            <div className="card-header"><h3>{affiliate.name}</h3><span className={`status-badge status-${affiliate.status}`}>{affiliate.status}</span></div>
                            <div className="card-body"><p><strong>E-mail:</strong> {affiliate.email}</p><p><strong>Data de Cadastro:</strong> {new Date(affiliate.createdAt?.seconds * 1000).toLocaleDateString()}</p></div>
                            {affiliate.status === 'pending' && (
                                <div className="card-actions">
                                    <button className="btn btn-approve" onClick={() => handleUpdateStatus(affiliate.id, 'approved')}>Aprovar</button>
                                    <button className="btn btn-reject" onClick={() => handleUpdateStatus(affiliate.id, 'rejected')}>Rejeitar</button>
                                </div>
                            )}
                        </div>
                    )) : <p className="empty-state">Nenhum afiliado encontrado neste filtro.</p>
                )}
            </div>
        </div>
    );
};

// Componente para a gestão de campanhas
const CampaignManager = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCampaigns = useCallback(async () => { setCampaigns(await getCampaigns()); }, []);
    useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

    const handleCreateCampaign = async (e) => {
        e.preventDefault();
        if (!image) { alert("Por favor, selecione uma imagem."); return; }
        setLoading(true);
        await createCampaign({ title, description }, image);
        setTitle(''); setDescription(''); setImage(null); e.target.reset();
        await fetchCampaigns();
        setLoading(false);
    };

    return(
        <div className="campaign-manager">
            <div className="campaign-form-container">
                <h3>Criar Nova Campanha</h3>
                <form onSubmit={handleCreateCampaign}>
                    <input type="text" placeholder="Título da Campanha" value={title} onChange={e => setTitle(e.target.value)} required />
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required />
                    <label>Imagem de Destaque</label>
                    <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} required />
                    <button type="submit" disabled={loading}>{loading ? 'A criar...' : 'Criar Campanha'}</button>
                </form>
            </div>
            <div className="campaign-list-container">
                <h3>Campanhas Ativas</h3>
                <div className="campaign-list">
                    {campaigns.map(c => <div key={c.id} className="campaign-card">
                        <img src={c.imageUrl} alt={c.title}/>
                        <h4>{c.title}</h4>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('affiliates');
    return (
        <div className="dashboard-container">
            <header className="dashboard-header"><h1>Painel do Administrador</h1></header>
            <div className="dashboard-content">
                <div className="main-tabs">
                    <button onClick={() => setActiveTab('affiliates')} className={activeTab === 'affiliates' ? 'active' : ''}>Gestão de Afiliados</button>
                    <button onClick={() => setActiveTab('campaigns')} className={activeTab === 'campaigns' ? 'active' : ''}>Gestão de Campanhas</button>
                </div>
                {activeTab === 'affiliates' && <AffiliateManager />}
                {activeTab === 'campaigns' && <CampaignManager />}
            </div>
        </div>
    );
};
export default AdminDashboard;