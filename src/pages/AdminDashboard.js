// src/pages/AdminDashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import { getAllUsers, updateUserStatus, createCampaign, getCampaigns } from '../firebaseFirestore';
import './AdminDashboard.css';

const AffiliateManager = () => {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');
    const [selectedAffiliate, setSelectedAffiliate] = useState(null);

    const fetchAffiliates = useCallback(async () => {
        setLoading(true);
        const allUsers = await getAllUsers();
        setAffiliates(allUsers.filter(user => user.role === 'affiliate'));
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAffiliates();
    }, [fetchAffiliates]);

    const handleUpdateStatus = async (userId, newStatus) => {
        await updateUserStatus(userId, newStatus);
        fetchAffiliates();
        setSelectedAffiliate(null); // Fecha o modal
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
                        <div key={affiliate.id} className="affiliate-card" onClick={() => setSelectedAffiliate(affiliate)}>
                            <div className="card-header">
                                <h3>{affiliate.name}</h3>
                                <span className={`status-badge status-${affiliate.status}`}>{affiliate.status}</span>
                            </div>
                            <p><strong>E-mail:</strong> {affiliate.email}</p>
                        </div>
                    )) : <p className="empty-state">Nenhum afiliado encontrado neste filtro.</p>
                )}
            </div>
            {selectedAffiliate && (
                <div className="modal-overlay" onClick={() => setSelectedAffiliate(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedAffiliate(null)}>&times;</button>
                        <h2>Detalhes do Afiliado</h2>
                        <p><strong>Nome:</strong> {selectedAffiliate.name}</p>
                        <p><strong>Email:</strong> {selectedAffiliate.email}</p>
                        <p><strong>Telefone:</strong> {selectedAffiliate.personalData?.phone || 'Não informado'}</p>
                        <p><strong>Documento:</strong> {selectedAffiliate.personalData?.documentId || 'Não informado'}</p>
                        <p><strong>Endereço:</strong> {selectedAffiliate.address ? `${selectedAffiliate.address.street}, ${selectedAffiliate.address.number}` : 'Não informado'}</p>
                        {selectedAffiliate.documentUrl && <a href={selectedAffiliate.documentUrl} target="_blank" rel="noopener noreferrer" className="link-document">Ver Documento Enviado</a>}
                        {selectedAffiliate.status === 'pending' && (
                            <div className="card-actions">
                                <button className="btn btn-approve" onClick={() => handleUpdateStatus(selectedAffiliate.id, 'approved')}>Aprovar</button>
                                <button className="btn btn-reject" onClick={() => handleUpdateStatus(selectedAffiliate.id, 'rejected')}>Rejeitar</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const CampaignManager = () => {
    const [formData, setFormData] = useState({ title: '', description: '', totalValue: '', quotaValue: '', availableQuotas: '' });
    const [image, setImage] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCampaigns = useCallback(async () => {
        setCampaigns(await getCampaigns());
    }, []);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCreateCampaign = async (e) => {
        e.preventDefault();
        if (!image) { alert("Por favor, selecione uma imagem."); return; }
        setLoading(true);
        await createCampaign(formData, image);
        setFormData({ title: '', description: '', totalValue: '', quotaValue: '', availableQuotas: '' });
        setImage(null);
        e.target.reset(); // Limpa o campo de ficheiro
        await fetchCampaigns();
        setLoading(false);
    };

    return (
        <div className="campaign-manager">
            <form className="campaign-form-container" onSubmit={handleCreateCampaign}>
                <h3>Criar Nova Campanha</h3>
                <input type="text" name="title" placeholder="Título da Campanha" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Descrição" value={formData.description} onChange={handleChange} required />
                <input type="number" name="totalValue" placeholder="Valor Total (R$)" value={formData.totalValue} onChange={handleChange} required />
                <input type="number" name="quotaValue" placeholder="Valor da Cota (R$)" value={formData.quotaValue} onChange={handleChange} required />
                <input type="number" name="availableQuotas" placeholder="Nº de Cotas Disponíveis" value={formData.availableQuotas} onChange={handleChange} required />
                <label>Imagem de Destaque</label>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} required />
                <button type="submit" disabled={loading}>{loading ? 'A criar...' : 'Criar Campanha'}</button>
            </form>
            <div className="campaign-list-container">
                <h3>Campanhas Ativas</h3>
                <div className="campaign-list">
                    {campaigns.map(c => (
                        <div key={c.id} className="campaign-card">
                            <img src={c.imageUrl} alt={c.title} />
                            <div className="campaign-card-info">
                                <h4>{c.title}</h4>
                                <span>{c.availableQuotas} cotas de R$ {c.quotaValue}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('affiliates');
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Painel do Administrador</h1>
            </header>
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