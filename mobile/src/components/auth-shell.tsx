import { ReactNode } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "@/src/theme";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  showBranding?: boolean;
  compactLogo?: boolean;
  headerTop?: ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  showBranding = true,
  compactLogo = false,
  headerTop,
}: AuthShellProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background}>
        <View style={styles.heroGlow} />
        <View style={styles.bottomGlow} />
        <View style={styles.textureCircle} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.logoWrap, compactLogo ? styles.logoWrapCompact : null]}>
            <View style={[styles.logoRing, compactLogo ? styles.logoRingCompact : null]} />
            <View style={[styles.logoBadge, compactLogo ? styles.logoBadgeCompact : null]}>
              <Image
                source={require("@/assets/logos/logo.png")}
                style={[styles.logoImage, compactLogo ? styles.logoImageCompact : null]}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={[styles.card, !showBranding ? styles.cardMinimal : null]}>
            {headerTop ? <View style={styles.headerTop}>{headerTop}</View> : null}

            {showBranding ? (
              <View style={styles.brandBlock}>
                <Text style={styles.welcome}>Welcome to</Text>
                <Text style={styles.brand}>DAMAYAN</Text>
              </View>
            ) : null}

            <Text style={[styles.title, !showBranding ? styles.titleMinimal : null]}>{title}</Text>
            {subtitle ? (
              <Text style={[styles.subtitle, !showBranding ? styles.subtitleMinimal : null]}>
                {subtitle}
              </Text>
            ) : null}
            {children}
          </View>

          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export const authStyles = StyleSheet.create({
  alertError: {
    width: "100%",
    backgroundColor: "#FFF1F1",
    borderColor: "#FFB9B9",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 14,
  },
  alertSuccess: {
    width: "100%",
    backgroundColor: "#EFFBF3",
    borderColor: "#B8E5C8",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 14,
  },
  alertTextError: {
    color: "#B11616",
    fontSize: 13,
  },
  alertTextSuccess: {
    color: COLORS.success,
    fontSize: 13,
  },
  field: {
    width: "100%",
    marginBottom: 14,
  },
  input: {
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.black,
    backgroundColor: "transparent",
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 11,
    color: COLORS.danger,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingLeft: 16,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
  },
  toggle: {
    color: "#6C6C6C",
    fontSize: 13,
    fontWeight: "700",
  },
  rowEnd: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 18,
  },
  link: {
    color: COLORS.primaryDark,
    fontSize: 12,
    fontWeight: "700",
  },
  submit: {
    width: "100%",
    minHeight: 48,
    alignSelf: "center",
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 18,
  },
  submitDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: 2,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: "#6A6558",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.socialBg,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#211700",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#211700",
  },
  heroGlow: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 9999,
    backgroundColor: "rgba(255, 195, 0, 0.32)",
    top: -140,
    left: -120,
  },
  bottomGlow: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 9999,
    backgroundColor: "rgba(255, 195, 0, 0.18)",
    bottom: -150,
    right: -110,
  },
  textureCircle: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    top: 120,
    right: -90,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 28,
  },
  logoWrap: {
    marginBottom: -58,
    zIndex: 3,
    alignItems: "center",
  },
  logoWrapCompact: {
    marginBottom: -42,
  },
  logoRing: {
    width: 124,
    height: 124,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
    position: "absolute",
  },
  logoRingCompact: {
    width: 96,
    height: 96,
  },
  logoBadge: {
    width: 104,
    height: 104,
    borderRadius: 9999,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
    marginTop: 10,
  },
  logoBadgeCompact: {
    width: 82,
    height: 82,
    marginTop: 0,
  },
  logoImage: {
    width: 64,
    height: 64,
  },
  logoImageCompact: {
    width: 46,
    height: 46,
  },
  card: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 34,
    paddingHorizontal: 24,
    paddingTop: 78,
    paddingBottom: 28,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 10,
    alignItems: "center",
  },
  cardMinimal: {
    paddingTop: 50,
  },
  headerTop: {
    width: "100%",
    marginBottom: 2,
  },
  brandBlock: {
    alignItems: "center",
    marginBottom: 8,
  },
  welcome: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "300",
    color: COLORS.black,
    marginBottom: 2,
  },
  brand: {
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: 2,
    color: COLORS.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
  },
  titleMinimal: {
    alignSelf: "flex-start",
    textAlign: "left",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 18,
    color: COLORS.textSoft,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
  subtitleMinimal: {
    textAlign: "left",
    alignSelf: "flex-start",
  },
  footer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
});


