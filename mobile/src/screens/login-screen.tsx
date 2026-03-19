import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthShell, authStyles } from "@/src/components/auth-shell";
import { SocialRow } from "@/src/components/social-row";
import { useAuth } from "@/src/providers/auth-provider";
import { COLORS } from "@/src/theme";

let rememberedMobileEmail = "";

export function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(rememberedMobileEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedMobileEmail));
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (rememberedMobileEmail) {
      setEmail(rememberedMobileEmail);
      setRememberMe(true);
    }
  }, []);

  const validate = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  };

  const handleLogin = async () => {
    setError(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(email.trim(), password);
      rememberedMobileEmail = rememberMe ? email.trim() : "";
      router.replace("/dashboard");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to log in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="LOGIN"
      subtitle="Use demo credentials: demo@damayan.app / password123"
      footer={
        <>
          <Text style={{ fontSize: 11, color: "#FFFFFF" }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ fontSize: 11, fontWeight: "700", color: COLORS.primaryDark }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </>
      }
    >
      {error ? (
        <View style={authStyles.alertError}>
          <Text style={authStyles.alertTextError}>{error}</Text>
        </View>
      ) : null}

      <View style={authStyles.field}>
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) {
              setEmailError(null);
            }
          }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={[authStyles.input, emailError ? authStyles.inputError : null]}
        />
        {emailError ? <Text style={authStyles.errorText}>{emailError}</Text> : null}
      </View>

      <View style={authStyles.field}>
        <View style={[authStyles.passwordBox, passwordError ? authStyles.inputError : null]}>
          <TextInput
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) {
                setPasswordError(null);
              }
            }}
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={authStyles.passwordInput}
          />
          <TouchableOpacity onPress={() => setShowPassword((current) => !current)}>
            <Text style={authStyles.toggle}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={authStyles.errorText}>{passwordError}</Text> : null}
      </View>

      <View style={styles.optionsRow}>
        <TouchableOpacity style={styles.rememberWrap} onPress={() => setRememberMe((current) => !current)}>
          <View style={[styles.checkbox, rememberMe ? styles.checkboxOn : null]}>
            {rememberMe ? <Text style={styles.checkIcon}>x</Text> : null}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={authStyles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[authStyles.submit, isLoading ? authStyles.submitDisabled : null]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={authStyles.submitText}>Login</Text>
        )}
      </TouchableOpacity>

      <SocialRow />
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  optionsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  rememberWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  checkboxOn: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkIcon: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 14,
  },
  rememberText: {
    color: COLORS.textSoft,
    fontSize: 12,
    fontWeight: "600",
  },
});

