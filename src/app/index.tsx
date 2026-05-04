import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockDecks, mockStats, weeklyActivity } from "../constants/mock-data";
import { borderRadius, colors, fontSize, spacing } from "../constants/theme";

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View
        style={[styles.statIconContainer, { backgroundColor: color + "20" }]}
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function WeeklyChart() {
  const maxCards = Math.max(...weeklyActivity.map((d) => d.cards));

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.sectionTitle}>Atividade Semanal</Text>
      <View style={styles.chart}>
        {weeklyActivity.map((day, index) => (
          <View key={index} style={styles.chartBar}>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${(day.cards / maxCards) * 100}%`,
                    backgroundColor:
                      index === weeklyActivity.length - 1
                        ? colors.primary
                        : colors.primaryDark,
                  },
                ]}
              />
            </View>
            <Text style={styles.barLabel}>{day.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function RecentDeck({ deck }: { deck: (typeof mockDecks)[0] }) {
  const progress = (deck.masteredCount / deck.cardCount) * 100;

  return (
    <TouchableOpacity style={styles.recentDeck}>
      <View style={[styles.deckIcon, { backgroundColor: deck.color + "20" }]}>
        <Ionicons
          name={deck.icon as keyof typeof Ionicons.glyphMap}
          size={20}
          color={deck.color}
        />
      </View>
      <View style={styles.deckInfo}>
        <Text style={styles.deckName}>{deck.name}</Text>
        <Text style={styles.deckMeta}>{deck.dueCount} cards para revisar</Text>
      </View>
      <View style={styles.progressCircle}>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bem-vindo de volta!</Text>
            <Text style={styles.title}>Space Ark</Text>
          </View>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={20} color={colors.warning} />
            <Text style={styles.streakText}>{mockStats.streak}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="flash"
            label="Hoje"
            value={mockStats.todayCards}
            color={colors.primary}
          />
          <StatCard
            icon="checkmark-circle"
            label="Dominados"
            value={mockStats.masteredCards}
            color={colors.accent}
          />
          <StatCard
            icon="layers"
            label="Total"
            value={mockStats.totalCards}
            color={colors.warning}
          />
          <StatCard
            icon="trending-up"
            label="Meta"
            value={`${mockStats.weeklyProgress}/${mockStats.weeklyGoal}`}
            color="#8b5cf6"
          />
        </View>

        {/* Study Now Button */}
        <TouchableOpacity style={styles.studyButton}>
          <Ionicons name="rocket" size={24} color={colors.background} />
          <Text style={styles.studyButtonText}>Comecar Sessao de Estudo</Text>
        </TouchableOpacity>

        {/* Weekly Chart */}
        <WeeklyChart />

        {/* Recent Decks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Decks Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {mockDecks.slice(0, 3).map((deck) => (
            <RecentDeck key={deck.id} deck={deck} />
          ))}
        </View>
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
    paddingVertical: spacing.xl,
  },
  greeting: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.warning + "20",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  streakText: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.warning,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 3,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  studyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
  },
  studyButtonText: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.background,
  },
  chartContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  chartBar: {
    alignItems: "center",
    flex: 1,
  },
  barContainer: {
    width: 24,
    height: 80,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.sm,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderRadius: borderRadius.sm,
  },
  barLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing["2xl"],
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
  recentDeck: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  deckIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  deckInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  deckName: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  deckMeta: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  progressCircle: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: fontSize.sm,
    fontWeight: "bold",
    color: colors.primary,
  },
});
