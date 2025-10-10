// src/pages/AffiliateDashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getCampaigns } from '../firebaseFirestore';
import { FaChartLine, FaHandHoldingUsd, FaUsers } from 'react-icons/fa';
import './AuthPages.css';
import './AffiliateDashboard.css';

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
                {userData?.status === 'approved' ? (
                    <>
                        {/* INDICADORES / KPIs */}
                        <div className="kpi-grid">
                            <div className="kpi-card">
                                <h3>Comissão Pendente</h3>
                                <span>R$ 0,00</span>
                                <FaHandHoldingUsd className="kpi-icon" />
                            </div>
                            <div className="kpi-card">
                                <h3>Leads Gerados</h3>
                                <span>0</span>
                                <FaUsers className="kpi-icon" />
                            </div>
                             <div className="kpi-card">
                                <h3>Performance</h3>
                                <span>0%</span>
                                <FaChartLine className="kpi-icon" />
                            </div>
                        </div>
                        {/* LISTA DE CAMPANHAS */}
                        <div className="campaigns-grid">
                            <h2>Oportunidades Disponíveis</h2>
                            {loadingCampaigns ? <p>A carregar campanhas...</p> : campaigns.map(c => (
                                <div key={c.id} className="aff-campaign-card">
                                    <img src={c.imageUrl} alt={c.title} />
                                    <div className="aff-campaign-info">
                                        <h3>{c.title}</h3>
                                        <p>{c.description}</p>
                                        <div className="campaign-numbers">
                                            <span><strong>Valor Total:</strong> R$ {Number(c.totalValue).toLocaleString('pt-BR')}</span>
                                            <span><strong>Cotas Disp.:</strong> {c.availableQuotas}</span>
                                            <span><strong>Valor da Cota:</strong> R$ {Number(c.quotaValue).toLocaleString('pt-BR')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : userData?.status === 'pending' ? (
                    <div className="status-message status-pending">
                        <h3>O seu cadastro está em análise.</h3>
                        <p>Aguarde a aprovação para ter acesso completo.</p>
                    </div>
                ) : (
                     <div className="status-message status-rejected">
                        <h3>O seu cadastro foi rejeitado.</h3>
                        <p>Entre em contacto com o nosso suporte para mais informações.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default AffiliateDashboard;