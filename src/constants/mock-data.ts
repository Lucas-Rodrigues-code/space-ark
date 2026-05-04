export interface Deck {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  dueCount: number;
  masteredCount: number;
  color: string;
  icon: string;
  lastStudied?: string;
}

export interface Card {
  id: string;
  front: string;
  back: string;
  deckId: string;
  difficulty: "easy" | "medium" | "hard";
  nextReview?: string;
  timesReviewed: number;
}

export interface StudyStats {
  totalCards: number;
  masteredCards: number;
  streak: number;
  todayCards: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

export const mockDecks: Deck[] = [
  {
    id: "1",
    name: "JavaScript",
    description: "Fundamentos e conceitos avancados de JS",
    cardCount: 120,
    dueCount: 15,
    masteredCount: 85,
    color: "#f59e0b",
    icon: "code",
    lastStudied: "2 horas atras",
  },
  {
    id: "2",
    name: "React Native",
    description: "Desenvolvimento mobile com React Native",
    cardCount: 80,
    dueCount: 8,
    masteredCount: 55,
    color: "#06b6d4",
    icon: "smartphone",
    lastStudied: "1 dia atras",
  },
  {
    id: "3",
    name: "TypeScript",
    description: "Tipos e padroes avancados",
    cardCount: 65,
    dueCount: 12,
    masteredCount: 40,
    color: "#3b82f6",
    icon: "file-code",
    lastStudied: "3 horas atras",
  },
  {
    id: "4",
    name: "Ingles",
    description: "Vocabulario e expressoes",
    cardCount: 200,
    dueCount: 25,
    masteredCount: 150,
    color: "#10b981",
    icon: "book-open",
    lastStudied: "5 horas atras",
  },
  {
    id: "5",
    name: "Matematica",
    description: "Formulas e teoremas",
    cardCount: 90,
    dueCount: 5,
    masteredCount: 70,
    color: "#8b5cf6",
    icon: "calculator",
    lastStudied: "2 dias atras",
  },
];

export const mockCards: Card[] = [
  {
    id: "1",
    front: "O que e uma closure em JavaScript?",
    back: 'Uma closure e uma funcao que tem acesso ao escopo da funcao externa, mesmo apos a funcao externa ter retornado. Ela "lembra" do ambiente em que foi criada.',
    deckId: "1",
    difficulty: "medium",
    timesReviewed: 5,
  },
  {
    id: "2",
    front: "Qual a diferenca entre let, const e var?",
    back: "var tem escopo de funcao e sofre hoisting. let e const tem escopo de bloco. const nao permite reatribuicao, mas objetos/arrays podem ser mutados.",
    deckId: "1",
    difficulty: "easy",
    timesReviewed: 8,
  },
  {
    id: "3",
    front: "O que e o Event Loop?",
    back: "O Event Loop e o mecanismo que permite JavaScript executar operacoes assincronas. Ele monitora a Call Stack e a Callback Queue, movendo callbacks para a stack quando esta vazia.",
    deckId: "1",
    difficulty: "hard",
    timesReviewed: 3,
  },
];

export const mockStats: StudyStats = {
  totalCards: 555,
  masteredCards: 400,
  streak: 12,
  todayCards: 45,
  weeklyGoal: 50,
  weeklyProgress: 38,
};

export const weeklyActivity = [
  { day: "Seg", cards: 42 },
  { day: "Ter", cards: 38 },
  { day: "Qua", cards: 55 },
  { day: "Qui", cards: 30 },
  { day: "Sex", cards: 48 },
  { day: "Sab", cards: 25 },
  { day: "Dom", cards: 38 },
];
