import React from 'react';
import { Button } from './Button';

type HeroProps = {
    backgroundImageUrl: string;
};

export const Hero: React.FC<HeroProps> = ({ backgroundImageUrl }) => {
    const sectionStyle: React.CSSProperties = {
        backgroundImage: `url(${backgroundImageUrl})`,
    };

    return (
        <main className="hero-container">
            <section className="hero" style={sectionStyle} aria-label="DAMAYAN landing page hero section">
                <div className="hero__overlay" />

                <div className="hero__content">
                    <p className="hero__eyebrow">
                        Welcome To <span>DAMAYAN</span>
                    </p>

                    <h1 className="hero__title">
                        Stay <span>Safe</span>, Stay <span>Informed</span>,
                        Stay <span>United</span>.
                    </h1>

                    <p className="hero__description">
                        Together, we can protect lives by ensuring timely alerts, clear reporting, and safe evacuations.
                        Your vigilance today saves communities tomorrow.
                    </p>

                    <div className="hero__actions">
                        <Button label="View Reports" href="#reports" variant="solid" />
                        <Button label="Report an Incident" href="#incident" variant="outline" />
                    </div>
                </div>
            </section>

            <div className="gold-bar" />
        </main>
    );
};