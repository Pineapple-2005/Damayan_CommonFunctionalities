import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import '../index.css';

// Configure Nunito for slogans/titles
const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    style: ['normal', 'italic'],
    variable: '--font-nunito',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'DAMAYAN',
    description: 'DAMAYAN helps communities stay safe, stay informed, and stay united through disaster alerts, reporting, and evacuation support.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={nunito.variable}>
            {/* Remove the system font stack to SF Pro implicitly or explicitly set it in CSS */}
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
