import { useRouter } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/src/theme";

export function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("@/assets/images/bg.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.heroOverlay} />
      <View style={styles.bottomBand} />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.navPill}>
            <View style={styles.logoRing}>
              <View style={styles.logoInner}>
                <Image source={require("@/assets/logos/logo.png")} style={styles.logoImage} />
              </View>
            </View>

            <View style={styles.navLinksRow}>
              <Text style={styles.navLink}>Home</Text>
              <Text style={styles.navLink}>About Us</Text>
            </View>

            <View style={styles.authNavPill}>
              <TouchableOpacity style={styles.authButton} onPress={() => router.push("/signup")}>
                <Text style={styles.authText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.authButton} onPress={() => router.push("/login")}>
                <Text style={styles.authText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.intro}>
            Welcome To <Text style={styles.introBrand}>DAMAYAN</Text>
          </Text>

          <Text style={styles.headline}>
            Stay <Text style={styles.headlineAccent}>Safe</Text>, Stay <Text style={styles.headlineAccent}>Informed</Text>, Stay <Text style={styles.headlineAccent}>United</Text>.
          </Text>

          <Text style={styles.support}>
            Together, we can protect lives by ensuring timely alerts, clear reporting, and safe evacuations.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryAction} onPress={() => router.push("/login")}>
              <Text style={styles.primaryActionText}>View Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryAction} onPress={() => router.push("/signup")}>
              <Text style={styles.secondaryActionText}>Report an Incident</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(37, 29, 0, 0.45)",
  },
  bottomBand: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    backgroundColor: COLORS.primary,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 72,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  navPill: {
    width: "100%",
    height: 60,
    borderRadius: 999,
    backgroundColor: "rgba(215, 164, 0, 0.92)",
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 8,
  },
  logoRing: {
    position: "absolute",
    left: -12,
    top: "50%",
    marginTop: -36,
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoInner: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  navLinksRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    marginLeft: 60,
  },
  navLink: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  authNavPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    height: 40,
    paddingHorizontal: 6,
  },
  authButton: {
    minWidth: 52,
    height: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  authText: {
    color: "#9C7700",
    fontSize: 12,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  intro: {
    color: "#FFFFFF",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "600",
    marginBottom: 14,
    textAlign: "center",
  },
  introBrand: {
    color: COLORS.primary,
    fontWeight: "900",
    fontStyle: "normal",
  },
  headline: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 40,
    textAlign: "center",
    fontWeight: "700",
  },
  headlineAccent: {
    color: COLORS.primary,
  },
  support: {
    marginTop: 18,
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 360,
  },
  actions: {
    width: "100%",
    marginTop: 28,
    gap: 12,
    alignItems: "center",
  },
  primaryAction: {
    width: "92%",
    minHeight: 50,
    borderRadius: 999,
    backgroundColor: "rgba(215, 164, 0, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryAction: {
    width: "92%",
    minHeight: 50,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  secondaryActionText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
  },
});
