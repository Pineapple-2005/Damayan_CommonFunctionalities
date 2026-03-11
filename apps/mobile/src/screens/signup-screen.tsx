import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthShell, authStyles } from "@/src/components/auth-shell";
import { useAuth } from "@/src/providers/auth-provider";
import { COLORS } from "@/src/theme";

export function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);

    if (!name.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await signup(name.trim(), email.trim(), password);
      router.replace("/dashboard");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="SIGN UP"
      subtitle="Create a local account and continue into the app."
      footer={
        <>
          <Text style={{ fontSize: 11 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={{ fontSize: 11, fontWeight: "700", color: COLORS.primaryDark }}>
              Login
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
        <TextInput value={name} onChangeText={setName} placeholder="Full name" style={authStyles.input} />
      </View>
      <View style={authStyles.field}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={authStyles.input}
        />
      </View>
      <View style={authStyles.field}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={authStyles.input}
        />
      </View>
      <View style={authStyles.field}>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          secureTextEntry
          style={authStyles.input}
        />
      </View>

      <TouchableOpacity
        style={[authStyles.submit, isLoading ? authStyles.submitDisabled : null]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={authStyles.submitText}>Create account</Text>
        )}
      </TouchableOpacity>
    </AuthShell>
  );
}
