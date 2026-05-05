import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockCards, mockDecks } from "../constants/mock-data";
import { borderRadius, colors, fontSize, spacing } from "../constants/theme";

const currentDeck = mockDecks[0];

export default function StudyScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 12,
    incorrect: 3,
    remaining: 8,
  });

  const currentCard = mockCards[currentIndex % mockCards.length];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (response: "again" | "hard" | "good" | "easy") => {
    setIsFlipped(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.deckName}>{currentDeck.name}</Text>
          <Text style={styles.cardCount}>
            Card {currentIndex + 1} de {mockCards.length}
          </Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / mockCards.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Session Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBadge}>
          <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
          <Text style={[styles.statNumber, { color: colors.accent }]}>
            {sessionStats.correct}
          </Text>
        </View>
        <View style={styles.statBadge}>
          <Ionicons name="close-circle" size={16} color={colors.error} />
          <Text style={[styles.statNumber, { color: colors.error }]}>
            {sessionStats.incorrect}
          </Text>
        </View>
        <View style={styles.statBadge}>
          <Ionicons name="layers" size={16} color={colors.textSecondary} />
          <Text style={[styles.statNumber, { color: colors.textSecondary }]}>
            {sessionStats.remaining}
          </Text>
        </View>
      </View>

      {/* Flashcard */}
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={handleFlip}
        activeOpacity={0.95}
      >
        <View style={[styles.card, isFlipped && styles.cardFlipped]}>
          {!isFlipped ? (
            <View style={styles.cardContent}>
              <View style={styles.cardLabel}>
                <Ionicons name="help-circle" size={20} color={colors.primary} />
                <Text style={styles.cardLabelText}>Pergunta</Text>
              </View>
              <Text style={styles.cardText}>{currentCard.front}</Text>
              <Text style={styles.tapHint}>Toque para ver a resposta</Text>
            </View>
          ) : (
            <View style={styles.cardContent}>
              <View style={styles.cardLabel}>
                <Ionicons name="bulb" size={20} color={colors.accent} />
                <Text style={[styles.cardLabelText, { color: colors.accent }]}>
                  Resposta
                </Text>
              </View>
              <Text style={styles.cardText}>{currentCard.back}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Response Buttons */}
      {isFlipped && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Como foi?</Text>
          <View style={styles.responseButtons}>
            <TouchableOpacity
              style={[styles.responseButton, styles.againButton]}
              onPress={() => handleResponse("again")}
            >
              <Text style={styles.responseButtonText}>Repetir</Text>
              <Text style={styles.responseTime}>{"<1m"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.responseButton, styles.hardButton]}
              onPress={() => handleResponse("hard")}
            >
              <Text style={styles.responseButtonText}>Dificil</Text>
              <Text style={styles.responseTime}>6m</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.responseButton, styles.goodButton]}
              onPress={() => handleResponse("good")}
            >
              <Text style={styles.responseButtonText}>Bom</Text>
              <Text style={styles.responseTime}>10m</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.responseButton, styles.easyButton]}
              onPress={() => handleResponse("easy")}
            >
              <Text style={styles.responseButtonText}>Facil</Text>
              <Text style={styles.responseTime}>4d</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.bottomButton}>
          <Ionicons
            name="flag-outline"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Ionicons
            name="bookmark-outline"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Ionicons
            name="pencil-outline"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  deckName: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  cardCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  optionsButton: {
    padding: spacing.xs,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xl,
    marginBottom: spacing.lg,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  statNumber: {
    fontSize: fontSize.base,
    fontWeight: "600",
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius["2xl"],
    padding: spacing["2xl"],
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardFlipped: {
    borderColor: colors.accent,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  cardLabelText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: "600",
  },
  cardText: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    textAlign: "center",
    lineHeight: 30,
  },
  tapHint: {
    position: "absolute",
    bottom: 0,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  responseContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  responseTitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  responseButtons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  responseButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  responseButtonText: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  responseTime: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  againButton: {
    backgroundColor: colors.error + "30",
  },
  hardButton: {
    backgroundColor: colors.warning + "30",
  },
  goodButton: {
    backgroundColor: colors.accent + "30",
  },
  easyButton: {
    backgroundColor: colors.primary + "30",
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing["2xl"],
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bottomButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
});
