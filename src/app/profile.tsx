import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockStats, weeklyActivity } from "../constants/mock-data";
import { borderRadius, colors, fontSize, spacing } from "../constants/theme";

function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.statBox}>
      <Ionicons name={icon} size={24} color={colors.primary} />
      <Text style={styles.statBoxValue}>{value}</Text>
      <Text style={styles.statBoxLabel}>{label}</Text>
    </View>
  );
}

function SettingsItem({
  icon,
  label,
  value,
  color = colors.textSecondary,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  color?: string;
}) {
  return (
    <TouchableOpacity style={styles.settingsItem}>
      <View style={[styles.settingsIcon, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.settingsLabel}>{label}</Text>
      {value && <Text style={styles.settingsValue}>{value}</Text>}
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const totalCards = weeklyActivity.reduce((sum, day) => sum + day.cards, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={colors.primary} />
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>12</Text>
            </View>
          </View>
          <Text style={styles.userName}>Astronauta</Text>
          <Text style={styles.userEmail}>astronauta@spaceark.app</Text>

          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={24} color={colors.warning} />
            <Text style={styles.streakNumber}>{mockStats.streak}</Text>
            <Text style={styles.streakLabel}>dias de sequencia</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatBox
            icon="layers"
            value={mockStats.totalCards}
            label="Cards Totais"
          />
          <StatBox
            icon="checkmark-circle"
            value={mockStats.masteredCards}
            label="Dominados"
          />
          <StatBox icon="time" value={`${totalCards}h`} label="Tempo Total" />
          <StatBox icon="calendar" value="45" label="Dias Ativos" />
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            <View style={styles.achievement}>
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: colors.warning + "20" },
                ]}
              >
                <Ionicons name="flame" size={24} color={colors.warning} />
              </View>
              <Text style={styles.achievementLabel}>Sequencia 7</Text>
            </View>
            <View style={styles.achievement}>
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: colors.accent + "20" },
                ]}
              >
                <Ionicons name="rocket" size={24} color={colors.accent} />
              </View>
              <Text style={styles.achievementLabel}>Primeiro Deck</Text>
            </View>
            <View style={styles.achievement}>
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: colors.primary + "20" },
                ]}
              >
                <Ionicons name="star" size={24} color={colors.primary} />
              </View>
              <Text style={styles.achievementLabel}>100 Cards</Text>
            </View>
            <View style={[styles.achievement, styles.achievementLocked]}>
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: colors.textMuted + "20" },
                ]}
              >
                <Ionicons name="trophy" size={24} color={colors.textMuted} />
              </View>
              <Text style={styles.achievementLabel}>Mestre</Text>
            </View>
          </ScrollView>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuracoes</Text>
          <View style={styles.settingsCard}>
            <SettingsItem
              icon="notifications-outline"
              label="Notificacoes"
              value="Ativadas"
              color={colors.primary}
            />
            <SettingsItem
              icon="moon-outline"
              label="Tema"
              value="Escuro"
              color="#8b5cf6"
            />
            <SettingsItem
              icon="language-outline"
              label="Idioma"
              value="Portugues"
              color={colors.accent}
            />
            <SettingsItem
              icon="timer-outline"
              label="Meta Diaria"
              value="20 cards"
              color={colors.warning}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.settingsCard}>
            <SettingsItem
              icon="cloud-download-outline"
              label="Backup e Sincronizacao"
              color={colors.primary}
            />
            <SettingsItem
              icon="help-circle-outline"
              label="Ajuda e Suporte"
              color={colors.accent}
            />
            <SettingsItem
              icon="information-circle-outline"
              label="Sobre o Space Ark"
              color={colors.textSecondary}
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Space Ark v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  settingsButton: {
    padding: spacing.xs,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: spacing["2xl"],
    marginHorizontal: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.primary,
  },
  levelBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.card,
  },
  levelText: {
    fontSize: fontSize.xs,
    fontWeight: "bold",
    color: colors.background,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.warning + "15",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
  },
  streakNumber: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.warning,
  },
  streakLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statBox: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: "center",
  },
  statBoxValue: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  statBoxLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  achievementsContainer: {
    gap: spacing.md,
  },
  achievement: {
    alignItems: "center",
    width: 80,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  achievementLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: "center",
  },
  settingsCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    overflow: "hidden",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  settingsLabel: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  settingsValue: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.error + "15",
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  logoutText: {
    fontSize: fontSize.base,
    color: colors.error,
    fontWeight: "600",
  },
  version: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: spacing["3xl"],
  },
});
