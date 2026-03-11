/**
 * Damayan - Mobile Login Screen
 * React Native TSX
 * CI/CD Ready | Production Grade
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
}

interface LoginScreenProps {
  onLogin?: (email: string, password: string) => Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  onFacebookLogin?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = {
  primary: '#FFC300',
  primaryDark: '#B58A00',
  white: '#FFFFFF',
  black: '#000000',
  textLight: '#656565',
  textMid: '#6D6D6D',
  inputBorder: '#A9A9A9',
  cardBg: '#FFFFFF',
  socialBg: '#FAF6EB',
  socialBorder: '#FFC300',
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  onGoogleLogin,
  onAppleLogin,
  onFacebookLogin,
}) => {
  const [form, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
    showPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormState, string>>>({});

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormState, string>> = {};
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleLogin = useCallback(async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onLogin?.(form.email.trim(), form.password);
    } catch (error) {
      // Handle error from parent
    } finally {
      setIsLoading(false);
    }
  }, [form.email, form.password, onLogin]);

  const togglePassword = useCallback(() => {
    setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />

      {/* Top Yellow Blob */}
      <View style={styles.topBlob} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Circle */}
          <View style={styles.logoWrapper}>
            <View style={styles.logoCircle} />
            <Image
              source={{ uri: 'https://placehold.co/100x100' }}
              style={styles.logoImage}
              accessibilityLabel="Damayan logo"
            />
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandText}>DAMAYAN</Text>
            <Text style={styles.loginTitle}>LOGIN</Text>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="Email"
                placeholderTextColor={COLORS.textLight}
                value={form.email}
                onChangeText={(text) => {
                  setForm((prev) => ({ ...prev, email: text }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                accessibilityLabel="Email input"
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <View style={[styles.passwordWrapper, errors.password ? styles.inputError : null]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor={COLORS.textMid}
                  value={form.password}
                  onChangeText={(text) => {
                    setForm((prev) => ({ ...prev, password: text }));
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  secureTextEntry={!form.showPassword}
                  textContentType="password"
                  accessibilityLabel="Password input"
                />
                <TouchableOpacity
                  onPress={togglePassword}
                  accessibilityLabel={form.showPassword ? 'Hide password' : 'Show password'}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.eyeIcon}>{form.showPassword ? '🙈' : '👁'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={onForgotPassword}
              accessibilityLabel="Forgot password"
              style={styles.forgotWrapper}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              accessibilityLabel="Login button"
              accessibilityRole="button"
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={onGoogleLogin}
                accessibilityLabel="Login with Google"
                accessibilityRole="button"
              >
                <Text style={styles.socialIcon}>G</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={onAppleLogin}
                accessibilityLabel="Login with Apple"
                accessibilityRole="button"
              >
                <Text style={styles.socialIcon}></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={onFacebookLogin}
                accessibilityLabel="Login with Facebook"
                accessibilityRole="button"
              >
                <Text style={styles.socialIcon}>f</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Row */}
          <View style={styles.signUpRow}>
            <Text style={styles.signUpPrompt}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={onSignUp}
              accessibilityLabel="Sign up"
              accessibilityRole="button"
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Yellow Blob */}
      <View style={styles.bottomBlob} />
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    flexGrow: 1,
  },

  // Blobs
  topBlob: {
    position: 'absolute',
    width: 522,
    height: 328,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
    top: -4,
    left: -55,
  },
  bottomBlob: {
    position: 'absolute',
    width: 522,
    height: 328,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
    bottom: -120,
    left: -64,
  },

  // Logo
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 20,
  },
  logoCircle: {
    width: 115,
    height: 115,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
    position: 'absolute',
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },

  // Card
  card: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 32,
    marginTop: 40,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontStyle: 'italic',
    fontWeight: '300',
    color: COLORS.black,
    marginBottom: 2,
  },
  brandText: {
    fontSize: 48,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
    fontWeight: '400',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  loginTitle: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: 20,
  },

  // Inputs
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    height: 43,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 16,
    fontSize: 13,
    color: COLORS.black,
    backgroundColor: 'transparent',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 43,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.black,
  },
  eyeIcon: {
    fontSize: 16,
    paddingLeft: 8,
  },
  inputError: {
    borderColor: '#FF4444',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 11,
    marginTop: 4,
    marginLeft: 4,
  },

  // Forgot
  forgotWrapper: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  forgotText: {
    color: COLORS.primaryDark,
    fontSize: 11,
    fontWeight: '600',
  },

  // Login Button
  loginButton: {
    width: 131,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: COLORS.black,
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  socialButton: {
    width: 49.54,
    height: 50,
    backgroundColor: COLORS.socialBg,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: COLORS.socialBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: '700',
  },

  // Sign Up
  signUpRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  signUpPrompt: {
    fontSize: 11,
    fontWeight: '300',
    color: COLORS.black,
  },
  signUpLink: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
});

export default LoginScreen;
