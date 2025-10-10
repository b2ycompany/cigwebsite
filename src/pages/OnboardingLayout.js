// src/pages/OnboardingLayout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './Onboarding.css';

const steps = [
    { path: '/onboarding/personal', label: 'Dados Pessoais' },
    { path: '/onboarding/address', label: 'Endereço' },
    { path: '/onboarding/documents', label: 'Documentos' }
];

const OnboardingLayout = () => {
    const location = useLocation();
    const currentStepIndex = steps.findIndex(step => step.path === location.pathname);

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <div className="progress-bar">
                    {steps.map((step, index) => (
                        <div key={step.path} className={`progress-step ${index <= currentStepIndex ? 'active' : ''}`}>
                            {step.label}
                        </div>
                    ))}
                </div>
                <div className="onboarding-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default OnboardingLayout;