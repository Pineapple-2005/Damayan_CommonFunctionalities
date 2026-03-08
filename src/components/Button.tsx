import React from 'react';

type ButtonVariant = 'solid' | 'outline';

type ButtonProps = {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: ButtonVariant;
    ariaLabel?: string;
};

const isSafeExternalUrl = (value: string): boolean => {
    try {
        const url = new URL(value, window.location.origin);
        return ['http:', 'https:'].includes(url.protocol);
    } catch {
        return false;
    }
};

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    href,
    variant = 'solid',
    ariaLabel,
}) => {
    const className = `btn btn--${variant}`;

    if (href) {
        const safeHref = isSafeExternalUrl(href) ? href : '#';
        const isExternal = safeHref.startsWith('http');

        return (
            <a
                className={className}
                href={safeHref}
                aria-label={ariaLabel ?? label}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
            >
                {label}
            </a>
        );
    }

    return (
        <button type="button" className={className} onClick={onClick} aria-label={ariaLabel ?? label}>
            {label}
        </button>
    );
};