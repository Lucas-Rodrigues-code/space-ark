import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockDecks } from "../constants/mock-data";
import { borderRadius, colors, fontSize, spacing } from "../constants/theme";

function DeckCard({ deck }: { deck: (typeof mockDecks)[0] }) {
  const progress = (deck.masteredCount / deck.cardCount) * 100;

  return (
    <TouchableOpacity style={styles.deckCard}>
      <View style={styles.deckHeader}>
        <View style={[styles.deckIcon, { backgroundColor: deck.color + "20" }]}>
          <Ionicons
            name={deck.icon as keyof typeof Ionicons.glyphMap}
            size={24}
            color={deck.color}
          />
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.deckName}>{deck.name}</Text>
      <Text style={styles.deckDescription} numberOfLines={2}>
        {deck.description}
      </Text>

      <View style={styles.deckStats}>
        <View style={styles.statItem}>
          <Ionicons
            name="layers-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.statText}>{deck.cardCount} cards</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons
            name="time-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.statText}>{deck.lastStudied}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: deck.color },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {Math.round(progress)}% dominado
        </Text>
      </View>

      <View style={styles.deckActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: deck.color }]}
        >
          <Ionicons name="flash" size={16} color={colors.background} />
          <Text style={styles.actionButtonText}>Estudar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonOutline}>
          <Ionicons name="eye-outline" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonOutline}>
          <Ionicons
            name="pencil-outline"
            size={16}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {deck.dueCount > 0 && (
        <View style={styles.dueBadge}>
          <Text style={styles.dueBadgeText}>{deck.dueCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function DecksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Decks</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar decks..."
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={[styles.filterChip, styles.filterChipActive]}>
          <Text style={styles.filterChipTextActive}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Recentes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Para Revisar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Favoritos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.decksGrid}
      >
        {mockDecks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.card,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    fontSize: fontSize.sm,
    color: colors.background,
    fontWeight: "600",
  },
  decksGrid: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
  },
  deckCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    position: "relative",
  },
  deckHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  deckIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  moreButton: {
    padding: spacing.xs,
  },
  deckName: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  deckDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  deckStats: {
    flexDirection: "row",
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  statText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.full,
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: "100%",
    borderRadius: borderRadius.full,
  },
  progressLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  deckActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.background,
  },
  actionButtonOutline: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundTertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  dueBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing["3xl"],
    backgroundColor: colors.error,
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  dueBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
});
