// src/pages/AffiliateDashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getCampaigns } from '../firebaseFirestore';
import './AuthPages.css';
import './AffiliateDashboard.css'; // Novo CSS

const AffiliateDashboard = () => {
    const { userData, loading: authLoading } = useAuth();
    const [campaigns, setCampaigns] = useState([]);
    const [loadingCampaigns, setLoadingCampaigns] = useState(true);

    const fetchCampaigns = useCallback(async () => {
        if (userData?.status === 'approved') {
            setLoadingCampaigns(true);
            const campaignList = await getCampaigns();
            setCampaigns(campaignList);
            setLoadingCampaigns(false);
        }
    }, [userData]);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    if (authLoading) {
        return <div className="dashboard-loading"><p>A carregar dados do utilizador...</p></div>;
    }

    return (
        <div className="affiliate-dashboard-container">
            <header className="dashboard-header">
                <h1>Painel do Parceiro</h1>
                <p>Olá, {userData?.name}. Bem-vindo à sua área restrita.</p>
            </header>

            <div className="dashboard-content">
                {userData?.status === 'pending' && (
                    <div className="status-message status-pending">
                        <h3>O seu cadastro está em análise.</h3>
                        <p>Por favor, aguarde a aprovação de um administrador para ter acesso completo às oportunidades.</p>
                    </div>
                )}
                 {userData?.status === 'rejected' && (
                    <div className="status-message status-rejected">
                        <h3>O seu cadastro foi rejeitado.</h3>
                        <p>Entre em contacto com o nosso suporte para mais informações.</p>
                    </div>
                )}
                {userData?.status === 'approved' && (
                    <div className="campaigns-grid">
                        <h2>Oportunidades Disponíveis</h2>
                        {loadingCampaigns ? <p>A carregar campanhas...</p> : (
                            campaigns.map(campaign => (
                                <div key={campaign.id} className="aff-campaign-card">
                                    <img src={campaign.imageUrl} alt={campaign.title} />
                                    <div className="aff-campaign-info">
                                        <h3>{campaign.title}</h3>
                                        <p>{campaign.description}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default AffiliateDashboard;