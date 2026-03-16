import { Image, Text, TouchableOpacity, View } from "react-native";
import { authStyles } from "@/src/components/auth-shell";

export function SocialRow() {
  return (
    <>
      <View style={authStyles.dividerRow}>
        <View style={authStyles.dividerLine} />
        <Text style={authStyles.dividerText}>or continue with</Text>
        <View style={authStyles.dividerLine} />
      </View>

      <View style={authStyles.socialRow}>
        <TouchableOpacity style={authStyles.socialButton} accessibilityLabel="Continue with Google">
          <Image source={require("@/assets/icons/google.png")} style={authStyles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={authStyles.socialButton} accessibilityLabel="Continue with Apple">
          <Image source={require("@/assets/icons/apple.png")} style={authStyles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={authStyles.socialButton} accessibilityLabel="Continue with Facebook">
          <Image source={require("@/assets/icons/facebook.png")} style={authStyles.socialIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}
