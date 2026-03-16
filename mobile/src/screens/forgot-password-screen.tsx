import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from "react-native";
import { AuthShell, authStyles } from "@/src/components/auth-shell";
import { COLORS } from "@/src/theme";

type Step = "request" | "otp" | "reset" | "success";

export function ForgotPasswordScreen() {
  const router = useRouter();
  const otpRefs = useRef<Array<TextInput | null>>([]);
  const [step, setStep] = useState<Step>("request");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinedOtp = useMemo(() => otp.join(""), [otp]);

  const handleBack = () => {
    setError(null);

    if (step === "otp") {
      setStep("request");
      return;
    }

    if (step === "reset") {
      setStep("otp");
      return;
    }

    if (step === "success") {
      router.replace("/login");
      return;
    }

    router.replace("/login");
  };

  const handleSendCode = () => {
    setError(null);

    if (!identifier.trim()) {
      setError("Phone number or email is required.");
      return;
    }

    setStep("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    const nextValue = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = nextValue;
    setOtp(nextOtp);

    if (nextValue && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    setError(null);

    if (joinedOtp.length !== 6) {
      setError("Enter the full 6-digit OTP code.");
      return;
    }

    setStep("reset");
  };

  const handleResetPassword = () => {
    setError(null);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStep("success");
  };

  const title =
    step === "request"
      ? "Forgot Password"
      : step === "otp"
        ? "Enter OTP Code"
        : step === "reset"
          ? "Reset Password"
          : "Password Reset";

  const subtitle =
    step === "request"
      ? "Don't worry, happens to all of us. Enter your email below to recover your password"
      : step === "otp"
        ? "We've sent a 6-digit code to your provided Email or Number"
        : step === "reset"
          ? "Enter your new password to complete the reset."
          : "Your password has been changed. Please login again.";

  const headerBack =
    step === "success" ? null : (
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image source={require("@/assets/icons/arrow-left.png")} style={styles.backIcon} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    );

  return (
    <AuthShell
      title={title}
      subtitle={subtitle}
      showBranding={false}
      compactLogo
      headerTop={headerBack}
      footer={
        step === "success" ? null : (
          <>
            <Text style={styles.footerText}>Back to </Text>
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </>
        )
      }
    >
      {error ? (
        <View style={authStyles.alertError}>
          <Text style={authStyles.alertTextError}>{error}</Text>
        </View>
      ) : null}

      {step === "request" ? (
        <>
          <View style={authStyles.field}>
            <TextInput
              value={identifier}
              onChangeText={setIdentifier}
              placeholder="Phone Number or Email"
              style={authStyles.input}
            />
          </View>

          <TouchableOpacity style={authStyles.submit} onPress={handleSendCode}>
            <Text style={authStyles.submitText}>Send Code</Text>
          </TouchableOpacity>

          <View style={styles.visualWrap}>
            <Image
              source={require("@/assets/images/forgot-big.png")}
              style={styles.bigImage}
              resizeMode="cover"
            />
            <Image
              source={require("@/assets/images/forgot-small.png")}
              style={styles.smallImage}
              resizeMode="cover"
            />
          </View>
        </>
      ) : null}

      {step === "otp" ? (
        <>
          <View style={styles.otpRow}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={(element) => {
                  otpRefs.current[index] = element;
                }}
                value={value}
                onChangeText={(text) => handleOtpChange(index, text)}
                onKeyPress={(event) => handleOtpKeyPress(index, event)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpInput}
                textAlign="center"
              />
            ))}
          </View>

          <TouchableOpacity style={authStyles.submit} onPress={handleVerifyOtp}>
            <Text style={authStyles.submitText}>Verify OTP</Text>
          </TouchableOpacity>

          <View style={styles.helperBlock}>
            <Text style={styles.helperText}>Didn't receive the code?</Text>
            <TouchableOpacity
              onPress={() => {
                setOtp(["", "", "", "", "", ""]);
                setError(null);
              }}
            >
              <Text style={styles.helperLink}>Resend OTP Code</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}

      {step === "reset" ? (
        <>
          <View style={authStyles.field}>
            <View style={[authStyles.passwordBox, error ? authStyles.inputError : null]}>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry={!showNewPassword}
                style={authStyles.passwordInput}
              />
              <TouchableOpacity onPress={() => setShowNewPassword((current) => !current)}>
                <Text style={authStyles.toggle}>{showNewPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={authStyles.field}>
            <View style={[authStyles.passwordBox, error ? authStyles.inputError : null]}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry={!showConfirmPassword}
                style={authStyles.passwordInput}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword((current) => !current)}>
                <Text style={authStyles.toggle}>{showConfirmPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={authStyles.submit} onPress={handleResetPassword}>
            <Text style={authStyles.submitText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      ) : null}

      {step === "success" ? (
        <View style={styles.successWrap}>
          <Image
            source={require("@/assets/icons/password-reset.png")}
            style={styles.resetLogo}
            resizeMode="contain"
          />
          <TouchableOpacity style={authStyles.submit} onPress={() => router.replace("/login")}>
            <Text style={authStyles.submitText}>Back to Log In</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backIcon: {
    width: 16,
    height: 16,
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  visualWrap: {
    width: "100%",
    height: 150,
    marginTop: 2,
    marginBottom: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  bigImage: {
    width: "82%",
    height: 122,
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  smallImage: {
    width: 116,
    height: 76,
    position: "absolute",
    left: 18,
    bottom: 2,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  otpRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 18,
  },
  otpInput: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: "rgba(255, 195, 0, 0.35)",
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.black,
  },
  helperBlock: {
    width: "100%",
    alignItems: "flex-start",
  },
  helperText: {
    color: "#52410B",
    fontSize: 13,
  },
  helperLink: {
    marginTop: 4,
    color: "#8A6800",
    fontSize: 13,
    fontWeight: "600",
  },
  successWrap: {
    width: "100%",
    alignItems: "center",
  },
  resetLogo: {
    width: 96,
    height: 96,
    marginBottom: 14,
  },
  footerText: {
    fontSize: 11,
    color: "#FFFFFF",
  },
  footerLink: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
