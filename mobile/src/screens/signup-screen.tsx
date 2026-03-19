import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthShell, authStyles } from "@/src/components/auth-shell";
import { useAuth } from "@/src/providers/auth-provider";
import { COLORS } from "@/src/theme";

export function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationFileName, setVerificationFileName] = useState("");
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
    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!birthDate.trim()) {
      setError("Date of birth is required.");
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
    if (!verificationFileName.trim()) {
      setError("Verification file is required.");
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
      title="SIGN UP & VERIFY"
      subtitle="Create account details and upload your verification document."
      noScroll
      centered
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
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address*"
          style={authStyles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={authStyles.field}>
        <TextInput value={name} onChangeText={setName} placeholder="Full Name*" style={authStyles.input} />
      </View>
      <View style={authStyles.field}>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number*"
          style={authStyles.input}
          keyboardType="phone-pad"
        />
      </View>
      <View style={authStyles.field}>
        <TextInput
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="Date of Birth* (mm/dd/yyyy)"
          style={authStyles.input}
        />
      </View>
      <View style={authStyles.field}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password*"
          secureTextEntry
          style={authStyles.input}
        />
      </View>
      <View style={authStyles.field}>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password*"
          secureTextEntry
          style={authStyles.input}
        />
      </View>

      <View style={styles.verifyCard}>
        <Text style={styles.verifyTitle}>Upload Files for Verification*</Text>
        <Text style={styles.verifySub}>Drop your ID here or tap browse. JPG, PNG, PDF up to 10MB.</Text>

        <TouchableOpacity style={styles.browseButton} onPress={() => setVerificationFileName("government-id.jpg")}>
          <Text style={styles.browseButtonText}>Browse Files</Text>
        </TouchableOpacity>

        {verificationFileName ? <Text style={styles.fileName}>{verificationFileName}</Text> : null}
      </View>

      <TouchableOpacity
        style={[authStyles.submit, isLoading ? authStyles.submitDisabled : null]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={authStyles.submitText}>Create an Account</Text>
        )}
      </TouchableOpacity>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  verifyCard: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7D7A3",
    backgroundColor: "#FFF9E9",
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  verifyTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.black,
  },
  verifySub: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 17,
    color: "#6A6558",
  },
  browseButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
  },
  browseButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  fileName: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.primaryDark,
    fontWeight: "600",
  },
});
