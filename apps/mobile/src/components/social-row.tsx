import { Text, TouchableOpacity, View } from "react-native";
import { authStyles } from "@/src/components/auth-shell";

export function SocialRow() {
  return (
    <>
      <View style={authStyles.dividerRow}>
        <View style={authStyles.dividerLine} />
        <Text style={authStyles.dividerText}>OR</Text>
        <View style={authStyles.dividerLine} />
      </View>

      <View style={authStyles.socialRow}>
        <TouchableOpacity style={authStyles.socialButton} accessibilityLabel="Continue with Google">
          <Text style={[authStyles.socialText, { color: "#EA4335" }]}>G</Text>
        </TouchableOpacity>
        <TouchableOpacity style={authStyles.socialButton} accessibilityLabel="Continue with Apple">
          <Text style={authStyles.socialText}>O</Text>
        </TouchableOpacity>
        <TouchableOpacity style={authStyles.socialButton} accessibilityLabel="Continue with Facebook">
          <Text style={[authStyles.socialText, { color: "#4285F4" }]}>f</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
