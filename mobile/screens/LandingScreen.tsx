import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';
import { mobileTokens as t } from '../theme/tokens';

/**
 * PLACEHOLDER: Replace these with your actual asset paths.
 *
 * Example:
 *   const LOGO = require('../../assets/images/logo.png');
 *   const HERO_BG = require('../../assets/images/hero-bg.jpg');
 */
const LOGO = require('../../assets/images/logo.png');
const HERO_BG = require('../../assets/images/hero-bg.jpg');

const LandingScreen: React.FC = () => {
    return (
        <View style={styles.root}>
            {/* ── Hero Background ─────────────────────────── */}
            {HERO_BG ? (
                <ImageBackground
                    source={HERO_BG}
                    style={styles.heroBg}
                    resizeMode="cover"
                >
                    <View style={styles.heroOverlay} />
                    <LandingContent />
                </ImageBackground>
            ) : (
                <View style={[styles.heroBg, { backgroundColor: '#1a1a1a' }]}>
                    <View style={styles.heroOverlay} />
                    <LandingContent />
                </View>
            )}

            {/* ── Gold Bar ────────────────────────────────── */}
            <View style={styles.goldBar} />
        </View>
    );
};

/** The main content overlay on the hero */
const LandingContent: React.FC = () => {
    return (
        <View style={styles.content}>
            {/* ── Header ──────────────────────────────────── */}
            <View style={styles.header}>
                <View style={styles.headerShell}>
                    {/* Logo */}
                    <View style={styles.logoRing}>
                        {LOGO ? (
                            <Image source={LOGO} style={styles.logoImg} resizeMode="contain" />
                        ) : (
                            <Text style={styles.logoPlaceholder}>D</Text>
                        )}
                    </View>

                    {/* Nav */}
                    <View style={styles.nav}>
                        <Text style={styles.navLink}>Home</Text>
                        <Text style={styles.navLink}>About Us</Text>
                    </View>

                    {/* Auth Pill */}
                    <View style={styles.authPill}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.authBtn,
                                styles.authBtnFirst,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.authBtnText}>Sign Up</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.authBtn,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.authBtnText}>Log In</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* ── Hero Body ───────────────────────────────── */}
            <View style={styles.heroBody}>
                <Text style={styles.eyebrow}>
                    Welcome To{' '}
                    <Text style={{ color: t.colors.primary, fontStyle: 'normal' }}>
                        DAMAYAN
                    </Text>
                </Text>

                <Text style={styles.title}>
                    Stay{' '}
                    <Text style={styles.titleHighlight}>Safe</Text>, Stay{' '}
                    <Text style={styles.titleHighlight}>Informed</Text>,{'\n'}
                    Stay{' '}
                    <Text style={styles.titleHighlight}>United</Text>.
                </Text>

                <Text style={styles.description}>
                    Together, we can protect lives by ensuring timely alerts, clear
                    reporting, and safe evacuations. Your vigilance today saves
                    communities tomorrow.
                </Text>

                {/* ── Action Buttons ─────────────────────── */}
                <View style={styles.actions}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            styles.buttonPrimary,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Text style={styles.buttonPrimaryText}>View Reports</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            styles.buttonSecondary,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Text style={styles.buttonSecondaryText}>Report an Incident</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: t.colors.bg,
    },
    heroBg: {
        flex: 1,
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(10, 10, 10, 0.50)',
    },
    content: {
        flex: 1,
        zIndex: 2,
    },

    /* ── Header ─────────────────────────────────────── */
    header: {
        paddingTop: 48,
        paddingHorizontal: t.spacing.md,
        alignItems: 'center',
    },
    headerShell: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 30, 30, 0.65)',
        borderRadius: t.radius.pill,
        paddingVertical: 8,
        paddingRight: 6,
        paddingLeft: 60,
        gap: 6,
        position: 'relative',
    },

    /* ── Logo ────────────────────────────────────────── */
    logoRing: {
        position: 'absolute',
        left: -4,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: t.colors.primary,
        backgroundColor: t.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.24,
        shadowRadius: 12,
    },
    logoImg: {
        width: 40,
        height: 40,
    },
    logoPlaceholder: {
        fontSize: 28,
        fontWeight: '900',
        color: t.colors.bg,
    },

    /* ── Nav ──────────────────────────────────────────── */
    nav: {
        flexDirection: 'row',
        gap: 4,
        flex: 1,
    },
    navLink: {
        color: t.colors.primary,
        fontSize: 14,
        fontWeight: '700',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    /* ── Auth Pill ────────────────────────────────────── */
    authPill: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: t.colors.primary,
        borderRadius: t.radius.pill,
        overflow: 'hidden',
    },
    authBtn: {
        backgroundColor: t.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    authBtnFirst: {
        borderRightWidth: 1,
        borderRightColor: t.colors.primaryStrong,
    },
    authBtnText: {
        color: t.colors.bg,
        fontSize: 12,
        fontWeight: '700',
    },

    /* ── Hero Body ────────────────────────────────────── */
    heroBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: t.spacing.lg,
        paddingBottom: t.spacing.xxl,
    },
    eyebrow: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.88)',
        textAlign: 'center',
    },
    title: {
        marginTop: t.spacing.sm,
        fontSize: 42,
        lineHeight: 48,
        fontWeight: '900',
        fontStyle: 'italic',
        color: t.colors.white,
        textAlign: 'center',
    },
    titleHighlight: {
        color: t.colors.primary,
    },
    description: {
        marginTop: t.spacing.lg,
        fontSize: 16,
        lineHeight: 26,
        color: 'rgba(255,255,255,0.88)',
        textAlign: 'center',
        fontStyle: 'italic',
        maxWidth: 420,
    },

    /* ── Buttons ──────────────────────────────────────── */
    actions: {
        marginTop: t.spacing.xl,
        flexDirection: 'row',
        gap: t.spacing.md,
    },
    button: {
        minHeight: 52,
        paddingHorizontal: 28,
        borderRadius: t.radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    buttonPrimary: {
        backgroundColor: t.colors.primary,
        borderColor: t.colors.primaryStrong,
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,0.85)',
    },
    buttonPrimaryText: {
        color: t.colors.white,
        fontSize: 16,
        fontWeight: '800',
    },
    buttonSecondaryText: {
        color: t.colors.primary,
        fontSize: 16,
        fontWeight: '800',
    },
    pressed: {
        opacity: 0.88,
        transform: [{ scale: 0.98 }],
    },

    /* ── Gold Bar ─────────────────────────────────────── */
    goldBar: {
        height: 6,
        backgroundColor: t.colors.primary,
    },
});

export default LandingScreen;