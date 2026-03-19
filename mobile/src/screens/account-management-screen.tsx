import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/theme";

type Member = {
  id: string;
  name: string;
  phone: string;
  address: string;
};

const members: Member[] = [
  { id: "1", name: "Juan Dela Cruz", phone: "09192876901", address: "21 Sct. Rivera Paco, Manila" },
  { id: "2", name: "Maria Dela Cruz", phone: "09192876902", address: "21 Sct. Rivera Paco, Manila" },
  { id: "3", name: "Pedro Dela Cruz", phone: "09192876903", address: "21 Sct. Rivera Paco, Manila" },
  { id: "4", name: "Ana Dela Cruz", phone: "09192876904", address: "21 Sct. Rivera Paco, Manila" },
];

function HeaderBand({ title }: { title: string }) {
  return (
    <View style={styles.headerBand}>
      <Text style={styles.headerBandText}>{title}</Text>
    </View>
  );
}

function InputField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholder={placeholder} placeholderTextColor="#A08D53" style={styles.input} />
    </View>
  );
}

export function AccountManagementScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.pageGlowTop} />
        <View style={styles.pageGlowBottom} />

        <View style={styles.surface}>
          <View style={styles.topRow}>
            <View style={styles.profileWrap}>
              <View style={styles.avatarShell}>
                <Image source={require("@/assets/logos/logo.png")} style={styles.avatar} resizeMode="contain" />
              </View>
              <View style={styles.profileMeta}>
                <Text style={styles.name}>John Doenette</Text>
                <Text style={styles.email}>JoeDoenette@gmail.com</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.saveTopBtn}>
              <Text style={styles.saveTopBtnText}>Save</Text>
            </TouchableOpacity>
          </View>

          <HeaderBand title="General Information" />
          <View style={styles.grid2}>
            <InputField label="Full Name" placeholder="John Doenette" />
            <InputField label="Gender" placeholder="Female" />
            <InputField label="Date of Birth" placeholder="MM/DD/YYYY" />
            <InputField label="Home Address" placeholder="21 Sct. Rivera Paco, Manila" />
          </View>

          <HeaderBand title="Contact Information" />
          <View style={styles.grid2}>
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Email Address</Text>
                <TouchableOpacity style={styles.tagBtn}>
                  <Text style={styles.tagBtnText}>+Add Email</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="JohnDoenette@gmail.com"
                placeholderTextColor="#A08D53"
              />
            </View>
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Phone Number</Text>
                <TouchableOpacity style={styles.tagBtn}>
                  <Text style={styles.tagBtnText}>+Add Phone Number</Text>
                </TouchableOpacity>
              </View>
              <TextInput style={styles.input} placeholder="09635787333" placeholderTextColor="#A08D53" />
            </View>
          </View>

          <HeaderBand title="Family Management" />
          <View style={styles.familyGrid}>
            {members.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberAvatar}>
                  <Image source={require("@/assets/logos/logo.png")} style={styles.memberAvatarImage} resizeMode="contain" />
                </View>
                <View style={styles.memberInfo}>
                  <View style={styles.memberTopLine}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberPhone}>{member.phone}</Text>
                  </View>
                  <Text style={styles.memberAddress}>{member.address}</Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addFamily}>
            <Text style={styles.addFamilyText}>+Add Family Member</Text>
          </TouchableOpacity>

          <HeaderBand title="Security" />
          <View style={styles.securityRow}>
            <View style={styles.securityField}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="**************"
                secureTextEntry
                placeholderTextColor="#A08D53"
              />
            </View>
            <TouchableOpacity style={styles.tagBtnLarge}>
              <Text style={styles.tagBtnText}>Reset Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFDF6",
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 26,
    paddingTop: 10,
  },
  pageGlowTop: {
    position: "absolute",
    top: -60,
    left: -40,
    width: 210,
    height: 210,
    borderRadius: 999,
    backgroundColor: "rgba(255, 195, 0, 0.28)",
  },
  pageGlowBottom: {
    position: "absolute",
    bottom: 30,
    right: -45,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(255, 195, 0, 0.14)",
  },
  surface: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(181,138,0,0.1)",
    padding: 18,
    gap: 10,
    shadowColor: "#5E4900",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  profileWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  avatarShell: {
    width: 58,
    height: 58,
    borderRadius: 999,
    backgroundColor: "#FFF2BF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
  },
  profileMeta: {
    flex: 1,
  },
  name: {
    color: "#6F5600",
    fontSize: 18,
    fontWeight: "700",
  },
  email: {
    color: "#8A7535",
    fontSize: 13,
    marginTop: 2,
  },
  saveTopBtn: {
    minWidth: 86,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  saveTopBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
  headerBand: {
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  headerBandText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  grid2: {
    gap: 10,
  },
  field: {
    gap: 6,
  },
  label: {
    color: "#3F3205",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E0D4A8",
    borderRadius: 12,
    paddingHorizontal: 12,
    color: "#594A1C",
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  tagBtn: {
    height: 28,
    borderRadius: 9,
    paddingHorizontal: 10,
    backgroundColor: "#FFF2BF",
    borderWidth: 1,
    borderColor: "rgba(181,138,0,0.2)",
    justifyContent: "center",
  },
  tagBtnLarge: {
    height: 36,
    borderRadius: 9,
    paddingHorizontal: 14,
    backgroundColor: "#FFF2BF",
    borderWidth: 1,
    borderColor: "rgba(181,138,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  tagBtnText: {
    color: COLORS.primaryDark,
    fontSize: 13,
    fontWeight: "700",
  },
  familyGrid: {
    gap: 10,
  },
  memberCard: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#F1E2B3",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#5E4900",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.11,
    shadowRadius: 12,
    elevation: 3,
  },
  memberAvatar: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#FFEFBF",
    justifyContent: "center",
    alignItems: "center",
  },
  memberAvatarImage: {
    width: 28,
    height: 28,
  },
  memberInfo: {
    flex: 1,
  },
  memberTopLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  memberName: {
    color: COLORS.primaryDark,
    fontWeight: "700",
    fontSize: 13,
    flexShrink: 1,
  },
  memberPhone: {
    color: "#8A773F",
    fontSize: 12,
  },
  memberAddress: {
    color: "#8A773F",
    fontSize: 12,
    marginTop: 2,
  },
  editBtn: {
    minWidth: 44,
    height: 30,
    borderRadius: 999,
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  editText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },
  addFamily: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#FFF2BF",
    borderWidth: 1,
    borderColor: "rgba(181,138,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  addFamilyText: {
    color: COLORS.primaryDark,
    fontSize: 15,
    fontWeight: "700",
  },
  securityRow: {
    gap: 10,
  },
  securityField: {
    gap: 6,
  },
  bottomActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  saveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFF2BF",
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    color: COLORS.primaryDark,
    fontWeight: "700",
    fontSize: 16,
  },
});



