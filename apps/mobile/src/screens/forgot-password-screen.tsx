import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthShell, authStyles } from "@/src/components/auth-shell";
import { COLORS } from "@/src/theme";

export function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    setMessage(null);

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setMessage(`Reset instructions were sent to ${email.trim()}.`);
  };

  return (
    <AuthShell
      title="RESET"
      subtitle="Use this screen as the start of your password recovery flow."
      footer={
        <>
          <Text style={{ fontSize: 11 }}>Back to </Text>
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
      {message ? (
        <View style={authStyles.alertSuccess}>
          <Text style={authStyles.alertTextSuccess}>{message}</Text>
        </View>
      ) : null}

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

      <TouchableOpacity style={authStyles.submit} onPress={handleSubmit}>
        <Text style={authStyles.submitText}>Send reset link</Text>
      </TouchableOpacity>
    </AuthShell>
  );
}
