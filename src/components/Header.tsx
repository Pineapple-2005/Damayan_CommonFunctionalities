"use client";

import React, { useState } from 'react';

type NavItem = {
    label: string;
    href: string;
};

type HeaderProps = {
    navItems: NavItem[];
};

export const Header: React.FC<HeaderProps> = ({ navItems }) => {
    const [logoError, setLogoError] = useState(false);

    return (
        <header className="header" role="banner">
            <div className="header__shell">
                <a className="logo" href="#home" aria-label="DAMAYAN home">
                    <div className="logo__ring">
                        {/* Replace /images/logo.png with your actual logo */}
                        {logoError ? (
                            <span className="logo__fallback">D</span>
                        ) : (
                            <img
                                className="logo__img"
                                src="/images/logo.png"
                                alt="DAMAYAN logo"
                                onError={() => setLogoError(true)}
                            />
                        )}
                    </div>
                </a>

                <nav className="nav" aria-label="Primary navigation">
                    {navItems.map((item) => (
                        <a key={item.label} href={item.href} className="nav__link">
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="auth-pill" aria-label="Authentication actions">
                    <a href="#signup" className="auth-pill__link">
                        Sign Up
                    </a>
                    <a href="#login" className="auth-pill__link">
                        Log In
                    </a>
                </div>
            </div>
        </header>
    );
};