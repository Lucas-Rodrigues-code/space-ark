# Tasks: Fundacao do App Frontend

**Input**: Design documents from `/specs/001-setup-expo-app/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/app-shell.md, quickstart.md

**Validation**: Esta feature segue a politica do projeto sem testes automatizados. Cada user story deve incluir validacao manual documentada e evidencia de execucao.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar o projeto Expo e preparar a base de configuracao compartilhada.

- [ ] T001 Inicializar o projeto Expo com TypeScript em package.json, app.json, tsconfig.json e babel.config.js
- [ ] T002 Configurar dependencias centrais do app em package.json
- [ ] T003 [P] Configurar qualidade e convencoes de desenvolvimento em eslint.config.js, .prettierrc e .gitignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Criar a infraestrutura base que bloqueia todas as user stories.

**⚠️ CRITICAL**: Nenhuma user story deve começar antes da conclusao desta fase.

- [ ] T004 Criar o shell base de rotas em app/_layout.tsx e app/(tabs)/_layout.tsx
- [ ] T005 [P] Definir tipos compartilhados iniciais em src/shared/types/app.ts e src/shared/types/study.ts
- [ ] T006 [P] Definir contratos de repositorios e gateways em src/data/repositories/local-study-repository.ts, src/data/repositories/remote-sync-gateway.ts e src/data/repositories/auth-gateway.ts
- [ ] T007 [P] Criar store de bootstrap com persistencia de preferencias em src/state/app-store/use-app-store.ts
- [ ] T008 [P] Criar tema e componentes base de tela em src/ui/theme/index.ts, src/ui/components/screen-shell.tsx e src/ui/components/empty-state.tsx
- [ ] T009 Criar checklist inicial de validacao manual em validation/manual-checklists/setup-expo-app.md

**Checkpoint**: A fundacao do projeto esta pronta para receber implementacoes por user story.

---

## Phase 3: User Story 1 - Iniciar o app base (Priority: P1) 🎯 MVP

**Goal**: Entregar um app Expo executavel com shell inicial navegavel em Home, Revisao e Decks.

**Independent Validation**: Instalar dependencias, abrir o app, navegar entre as tres abas e confirmar que o shell funciona sem backend configurado.

### Validation for User Story 1

- [ ] T010 [US1] Documentar o fluxo de validacao manual do shell inicial em validation/manual-checklists/setup-expo-app.md
- [ ] T011 [US1] Executar a validacao manual do shell inicial e registrar o resultado em validation/manual-checklists/setup-expo-app.md

### Implementation for User Story 1

- [ ] T012 [P] [US1] Criar a tela Home inicial em app/(tabs)/index.tsx
- [ ] T013 [P] [US1] Criar a tela Revisao inicial em app/(tabs)/review.tsx
- [ ] T014 [P] [US1] Criar a tela Decks inicial em app/(tabs)/decks.tsx
- [ ] T015 [US1] Configurar o layout de abas e icones de navegacao em app/(tabs)/_layout.tsx
- [ ] T016 [US1] Implementar o fluxo de bootstrap visual do app em app/_layout.tsx e src/application/boot/bootstrap-provider.tsx
- [ ] T017 [US1] Criar o modal placeholder de edicao de deck em app/modal/deck-editor.tsx
- [ ] T018 [US1] Exibir estados basicos de carregamento e erro do shell em src/ui/components/app-bootstrap-state.tsx e src/state/app-store/use-app-store.ts

**Checkpoint**: User Story 1 deve estar funcional e validavel isoladamente.

---

## Phase 4: User Story 2 - Desenvolver sobre uma base organizada (Priority: P2)

**Goal**: Entregar uma arquitetura clara para UI, dominio, estado local e integracoes externas.

**Independent Validation**: Criar ou ajustar uma tela e um store seguindo o padrao proposto sem reestruturar o projeto.

### Validation for User Story 2

- [ ] T019 [US2] Documentar o fluxo de validacao manual da arquitetura base em validation/manual-checklists/setup-expo-app.md
- [ ] T020 [US2] Executar a validacao manual da arquitetura base e registrar o resultado em validation/manual-checklists/setup-expo-app.md

### Implementation for User Story 2

- [ ] T021 [P] [US2] Criar entidades de dominio de Deck e Note em src/domain/decks/deck.ts e src/domain/cards/note.ts
- [ ] T022 [P] [US2] Criar entidades de dominio de Card e ReviewEvent em src/domain/cards/card.ts e src/domain/reviews/review-event.ts
- [ ] T023 [P] [US2] Criar adapters locais e remotos placeholder em src/data/adapters/local/async-storage-preferences.ts, src/data/adapters/local/sqlite-study-repository.ts e src/data/adapters/remote/firebase-sync-gateway.ts
- [ ] T024 [P] [US2] Criar stores de estudo e decks em src/state/study-store/use-study-store.ts e src/state/deck-store/use-deck-store.ts
- [ ] T025 [P] [US2] Criar modulos de tela reutilizaveis em src/ui/screens/home-screen.tsx, src/ui/screens/review-screen.tsx e src/ui/screens/decks-screen.tsx
- [ ] T026 [US2] Conectar rotas aos modulos de tela e stores em app/(tabs)/index.tsx, app/(tabs)/review.tsx e app/(tabs)/decks.tsx
- [ ] T027 [US2] Criar casos de uso iniciais de inicializacao e inicio de sessao em src/application/use-cases/initialize-app.ts e src/application/use-cases/start-review-session.ts
- [ ] T028 [US2] Criar exports compartilhados de utilitarios e validacoes em src/shared/validation/index.ts e src/shared/utils/index.ts

**Checkpoint**: User Stories 1 e 2 devem funcionar independentemente e permitir evolucao sem retrabalho estrutural.

---

## Phase 5: User Story 3 - Preparar o app para evolucao do produto (Priority: P3)

**Goal**: Preparar a base para offline-first, sincronizacao remota futura e regras de estudo inspiradas no Anki.

**Independent Validation**: Confirmar que a base acomoda persistencia local estruturada, gateways remotos e extensao de fluxo sem alterar a arquitetura principal.

### Validation for User Story 3

- [ ] T029 [US3] Documentar o fluxo de validacao manual de offline e extensibilidade em validation/manual-checklists/setup-expo-app.md
- [ ] T030 [US3] Executar a validacao manual de offline e extensibilidade e registrar o resultado em validation/manual-checklists/setup-expo-app.md

### Implementation for User Story 3

- [ ] T031 [P] [US3] Criar contratos de agendamento e estados de revisao em src/domain/scheduling/scheduler.ts e src/domain/reviews/review-state.ts
- [ ] T032 [P] [US3] Criar o repositorio estruturado local para entidades de estudo em src/data/adapters/local/sqlite-study-repository.ts
- [ ] T033 [P] [US3] Criar gateways remotos futuros para autenticacao e sync em src/data/adapters/remote/firebase-auth-gateway.ts e src/data/adapters/remote/firebase-sync-gateway.ts
- [ ] T034 [P] [US3] Criar definicoes de rotas e pontos de extensao para fluxos futuros em src/application/navigation/routes.ts e app/modal/deck-editor.tsx
- [ ] T035 [US3] Adicionar sinais de offline e sincronizacao ao bootstrap e telas principais em src/state/app-store/use-app-store.ts, src/ui/screens/home-screen.tsx e src/ui/screens/review-screen.tsx
- [ ] T036 [US3] Definir placeholders de dados e evolucao de sessao em src/application/use-cases/load-due-cards.ts e src/application/use-cases/sync-study-data.ts

**Checkpoint**: Todas as user stories devem estar funcionalmente prontas e validaveis em isolamento.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar documentacao e validacao final da feature.

- [ ] T037 [P] Documentar a configuracao inicial e a arquitetura da fundacao em README.md
- [ ] T038 Ajustar consistencia visual e mensagens de estado em src/ui/screens/home-screen.tsx, src/ui/screens/review-screen.tsx e src/ui/screens/decks-screen.tsx
- [ ] T039 Executar a validacao final do quickstart e atualizar validation/manual-checklists/setup-expo-app.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: pode começar imediatamente.
- **Foundational (Phase 2)**: depende da conclusao de Setup e bloqueia todas as user stories.
- **User Story 1 (Phase 3)**: depende da conclusao da fase Foundational.
- **User Story 2 (Phase 4)**: depende da conclusao da fase Foundational; pode ser executada em paralelo com US1, mas faz mais sentido depois do shell inicial estar funcional.
- **User Story 3 (Phase 5)**: depende da conclusao da fase Foundational; pode evoluir em paralelo, mas depende conceitualmente dos contratos base criados para US2.
- **Polish (Phase 6)**: depende da conclusao das user stories desejadas.

### User Story Dependencies

- **US1 (P1)**: sem dependencia de outras user stories apos a fase Foundational.
- **US2 (P2)**: sem dependencia rigida de US1, mas reutiliza o shell entregue por US1.
- **US3 (P3)**: depende dos contratos e da organizacao base entregues por US2 para evolucao coerente.

### Within Each User Story

- Documentar a validacao manual antes de marcar a story como concluida.
- Criar contratos e tipos antes de conectar telas e fluxos.
- Conectar stores e casos de uso antes de refinar estados visuais finais.
- Registrar o resultado da validacao manual ao final de cada story.

## Parallel Opportunities

- `T003`, `T005`, `T006`, `T007` e `T008` podem rodar em paralelo na fundacao.
- `T012`, `T013` e `T014` podem rodar em paralelo para montar as tres areas principais do shell.
- `T021`, `T022`, `T023`, `T024` e `T025` podem rodar em paralelo em US2, pois tocam arquivos diferentes.
- `T031`, `T032`, `T033` e `T034` podem rodar em paralelo em US3, pois cobrem contratos e adapters separados.
- `T037` pode acontecer em paralelo com os ajustes finais visuais de `T038`.

## Parallel Example: User Story 1

```bash
Task: "Criar a tela Home inicial em app/(tabs)/index.tsx"
Task: "Criar a tela Revisao inicial em app/(tabs)/review.tsx"
Task: "Criar a tela Decks inicial em app/(tabs)/decks.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "Criar entidades de dominio de Deck e Note em src/domain/decks/deck.ts e src/domain/cards/note.ts"
Task: "Criar stores de estudo e decks em src/state/study-store/use-study-store.ts e src/state/deck-store/use-deck-store.ts"
Task: "Criar modulos de tela reutilizaveis em src/ui/screens/home-screen.tsx, src/ui/screens/review-screen.tsx e src/ui/screens/decks-screen.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "Criar contratos de agendamento e estados de revisao em src/domain/scheduling/scheduler.ts e src/domain/reviews/review-state.ts"
Task: "Criar gateways remotos futuros para autenticacao e sync em src/data/adapters/remote/firebase-auth-gateway.ts e src/data/adapters/remote/firebase-sync-gateway.ts"
Task: "Criar o repositorio estruturado local para entidades de estudo em src/data/adapters/local/sqlite-study-repository.ts"
```

## Implementation Strategy

### MVP First

1. Completar Phase 1: Setup.
2. Completar Phase 2: Foundational.
3. Completar Phase 3: User Story 1.
4. Validar manualmente o shell inicial e usar isso como MVP navegavel.

### Incremental Delivery

1. Setup + Foundational entregam a base tecnica.
2. US1 entrega valor visivel imediato com o app abrindo e navegando.
3. US2 consolida a arquitetura para desenvolvimento sustentavel.
4. US3 prepara a evolucao para persistencia estruturada, sincronizacao e regras de estudo.
5. Phase 6 encerra com documentacao e validacao manual final.
