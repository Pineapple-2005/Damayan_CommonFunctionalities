import { ReactNode } from "react";
import {
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
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBlob} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoWrap}>
            <View style={styles.logoRing} />
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>D</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.brand}>DAMAYAN</Text>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            {children}
          </View>

          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomBlob} />
    </SafeAreaView>
  );
}

export const authStyles = StyleSheet.create({
  alertError: {
    width: "100%",
    backgroundColor: "#FFF0F0",
    borderColor: "#FFB3B3",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  alertSuccess: {
    width: "100%",
    backgroundColor: "#EFFBF3",
    borderColor: "#B8E5C8",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
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
    marginBottom: 12,
  },
  input: {
    height: 44,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 16,
    fontSize: 13,
    color: COLORS.black,
    backgroundColor: "transparent",
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 11,
    color: COLORS.danger,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingLeft: 16,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 13,
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
    marginBottom: 16,
  },
  link: {
    color: COLORS.primaryDark,
    fontSize: 11,
    fontWeight: "700",
  },
  submit: {
    width: 160,
    height: 40,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
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
    width: "80%",
    alignSelf: "center",
    marginTop: 6,
    marginBottom: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: COLORS.black,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.socialBg,
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.black,
  },
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    overflow: "hidden",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 28,
  },
  topBlob: {
    position: "absolute",
    width: 522,
    height: 328,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
    top: -4,
    left: -55,
  },
  bottomBlob: {
    position: "absolute",
    width: 522,
    height: 328,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
    bottom: -120,
    left: -64,
  },
  logoWrap: {
    marginTop: 20,
    alignItems: "center",
  },
  logoRing: {
    width: 116,
    height: 116,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
    position: "absolute",
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: "#F9D54E",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 6,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#7F6000",
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.panel,
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 32,
    marginTop: 40,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 8,
    alignItems: "center",
  },
  welcome: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "300",
    color: COLORS.black,
    marginBottom: 2,
  },
  brand: {
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: 2,
    color: COLORS.primary,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.black,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
    color: COLORS.textSoft,
    fontSize: 13,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    marginTop: 18,
    alignItems: "center",
  },
});
