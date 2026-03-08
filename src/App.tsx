import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
];

const HERO_BG = '/images/hero-bg.jpg';

const App: React.FC = () => {
    return (
        <div id="home">
            <Header navItems={navItems} />
            <Hero backgroundImageUrl={HERO_BG} />
        </div>
    );
};

export default App;