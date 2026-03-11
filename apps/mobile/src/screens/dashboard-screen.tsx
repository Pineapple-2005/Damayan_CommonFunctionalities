import { useEffect } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/src/providers/auth-provider";
import { COLORS } from "@/src/theme";

export function DashboardScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.page}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Authenticated</Text>
        <Text style={styles.title}>Welcome back, {user.name}.</Text>
        <Text style={styles.body}>
          Your mobile auth flow is live. Add more routes under apps/mobile/app and build your main
          feature screens from here.
        </Text>

        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            logout();
            router.replace("/login");
          }}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Starter routes</Text>
        <Text style={styles.listItem}>1. Login</Text>
        <Text style={styles.listItem}>2. Sign Up</Text>
        <Text style={styles.listItem}>3. Forgot Password</Text>
        <Text style={styles.listItem}>4. Dashboard</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Next screens to build</Text>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Profile</Text>
          <Text style={styles.tileText}>Editable account details and status.</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Requests</Text>
          <Text style={styles.tileText}>Primary project workflow screen.</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Notifications</Text>
          <Text style={styles.tileText}>Recent activity and updates.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F6EFCF",
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 28,
    gap: 16,
  },
  hero: {
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 24,
  },
  eyebrow: {
    alignSelf: "flex-start",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,195,0,0.18)",
    color: "#765800",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.black,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSoft,
  },
  logout: {
    marginTop: 20,
    width: 140,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: "700",
  },
  panel: {
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 22,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.black,
  },
  listItem: {
    fontSize: 14,
    color: COLORS.textSoft,
    marginBottom: 6,
  },
  tile: {
    borderRadius: 18,
    backgroundColor: "#FFF4BC",
    padding: 16,
    marginTop: 10,
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: COLORS.black,
  },
  tileText: {
    fontSize: 14,
    color: COLORS.textSoft,
  },
});
