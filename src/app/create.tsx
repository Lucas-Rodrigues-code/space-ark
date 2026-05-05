import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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

type Tab = "manual" | "ai" | "import";

export default function CreateScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("manual");
  const [selectedDeck, setSelectedDeck] = useState(mockDecks[0]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Criar Card</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "manual" && styles.tabActive]}
            onPress={() => setActiveTab("manual")}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={
                activeTab === "manual" ? colors.primary : colors.textSecondary
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "manual" && styles.tabTextActive,
              ]}
            >
              Manual
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "ai" && styles.tabActive]}
            onPress={() => setActiveTab("ai")}
          >
            <Ionicons
              name="sparkles"
              size={20}
              color={activeTab === "ai" ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "ai" && styles.tabTextActive,
              ]}
            >
              Com IA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "import" && styles.tabActive]}
            onPress={() => setActiveTab("import")}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={20}
              color={
                activeTab === "import" ? colors.primary : colors.textSecondary
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "import" && styles.tabTextActive,
              ]}
            >
              Importar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === "manual" && (
          <View style={styles.formContainer}>
            {/* Deck Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Deck</Text>
              <TouchableOpacity style={styles.deckSelector}>
                <View
                  style={[
                    styles.deckSelectorIcon,
                    { backgroundColor: selectedDeck.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={selectedDeck.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={selectedDeck.color}
                  />
                </View>
                <Text style={styles.deckSelectorText}>{selectedDeck.name}</Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Front */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Frente (Pergunta)</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Digite a pergunta..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Back */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Verso (Resposta)</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Digite a resposta..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Tags */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tags (opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: importante, revisao, dificil"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton}>
              <Ionicons name="add-circle" size={20} color={colors.background} />
              <Text style={styles.submitButtonText}>Criar Card</Text>
            </TouchableOpacity>

            {/* Quick Add */}
            <TouchableOpacity style={styles.quickAddButton}>
              <Ionicons name="flash" size={20} color={colors.primary} />
              <Text style={styles.quickAddText}>Criar e adicionar outro</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "ai" && (
          <View style={styles.formContainer}>
            <View style={styles.aiHeader}>
              <View style={styles.aiIconContainer}>
                <Ionicons name="sparkles" size={32} color={colors.primary} />
              </View>
              <Text style={styles.aiTitle}>Geracao com IA</Text>
              <Text style={styles.aiDescription}>
                Descreva o topico e nossa IA criara flashcards automaticamente
                para voce estudar.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Topico ou Conteudo</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Ex: Explique os principais conceitos de programacao orientada a objetos em JavaScript..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numero de Cards</Text>
              <View style={styles.numberSelector}>
                {[5, 10, 15, 20].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.numberOption,
                      num === 10 && styles.numberOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.numberOptionText,
                        num === 10 && styles.numberOptionTextActive,
                      ]}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dificuldade</Text>
              <View style={styles.difficultySelector}>
                <TouchableOpacity style={styles.difficultyOption}>
                  <Text style={styles.difficultyText}>Iniciante</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.difficultyOption,
                    styles.difficultyOptionActive,
                  ]}
                >
                  <Text style={styles.difficultyTextActive}>Intermediario</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.difficultyOption}>
                  <Text style={styles.difficultyText}>Avancado</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton}>
              <Ionicons name="sparkles" size={20} color={colors.background} />
              <Text style={styles.submitButtonText}>Gerar Cards</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "import" && (
          <View style={styles.formContainer}>
            <View style={styles.importOptions}>
              <TouchableOpacity style={styles.importOption}>
                <View
                  style={[
                    styles.importIconContainer,
                    { backgroundColor: colors.accent + "20" },
                  ]}
                >
                  <Ionicons
                    name="document-text"
                    size={28}
                    color={colors.accent}
                  />
                </View>
                <Text style={styles.importTitle}>Arquivo CSV</Text>
                <Text style={styles.importDescription}>
                  Importe cards de uma planilha com colunas frente e verso
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.importOption}>
                <View
                  style={[
                    styles.importIconContainer,
                    { backgroundColor: colors.warning + "20" },
                  ]}
                >
                  <Ionicons name="reader" size={28} color={colors.warning} />
                </View>
                <Text style={styles.importTitle}>Texto Simples</Text>
                <Text style={styles.importDescription}>
                  Cole texto com perguntas e respostas separadas por linha
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.importOption}>
                <View
                  style={[
                    styles.importIconContainer,
                    { backgroundColor: colors.primary + "20" },
                  ]}
                >
                  <Ionicons name="layers" size={28} color={colors.primary} />
                </View>
                <Text style={styles.importTitle}>Anki Package</Text>
                <Text style={styles.importDescription}>
                  Importe decks completos do Anki (.apkg)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.importOption}>
                <View
                  style={[
                    styles.importIconContainer,
                    { backgroundColor: "#8b5cf6" + "20" },
                  ]}
                >
                  <Ionicons name="link" size={28} color="#8b5cf6" />
                </View>
                <Text style={styles.importTitle}>URL / Website</Text>
                <Text style={styles.importDescription}>
                  Extraia cards automaticamente de uma pagina web
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    marginBottom: spacing.xl,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  tabActive: {
    backgroundColor: colors.backgroundTertiary,
  },
  tabText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  tabTextActive: {
    color: colors.primary,
  },
  formContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: spacing.md,
  },
  deckSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deckSelectorIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  deckSelectorText: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  submitButtonText: {
    fontSize: fontSize.base,
    fontWeight: "bold",
    color: colors.background,
  },
  quickAddButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  quickAddText: {
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  aiHeader: {
    alignItems: "center",
    marginBottom: spacing["2xl"],
  },
  aiIconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  aiTitle: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  aiDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: spacing.xl,
  },
  numberSelector: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  numberOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.card,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  numberOptionActive: {
    backgroundColor: colors.primary + "20",
    borderColor: colors.primary,
  },
  numberOptionText: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  numberOptionTextActive: {
    color: colors.primary,
  },
  difficultySelector: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  difficultyOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.card,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  difficultyOptionActive: {
    backgroundColor: colors.primary + "20",
    borderColor: colors.primary,
  },
  difficultyText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  difficultyTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  importOptions: {
    gap: spacing.md,
  },
  importOption: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  importIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  importTitle: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  importDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
