# Implementation Plan: Fundacao do App Frontend

**Branch**: `[001-setup-expo-app]` | **Date**: 2026-03-31 | **Spec**: `/home/lucas/projetos/space-ark/specs/001-setup-expo-app/spec.md`
**Input**: Feature specification from `/specs/001-setup-expo-app/spec.md`

## Summary

Estabelecer a fundacao do aplicativo mobile do Space Ark com Expo e TypeScript, usando um shell inicial de produto com Home, Revisao e Decks, navegacao via Expo Router, estado local com Zustand, persistencia offline inicial no cliente e limites claros entre UI, dominio e adapters de integracao. O Firebase entra apenas como servico externo planejado, sem acoplar a base do app ao backend.

## Technical Context

**Language/Version**: TypeScript 5.x em projeto Expo React Native  
**Primary Dependencies**: Expo, Expo Router, Zustand, Zod, AsyncStorage, Expo SQLite, React Native SVG  
**Storage**: AsyncStorage para preferencias e hidratacao de estado; SQLite local para evolucao de decks, cards e historico; Firebase como persistencia remota futura via adapters  
**Validation**: validacao manual por execucao local, navegacao entre areas principais, verificacao funcional de stores e inspecao do shell inicial  
**Target Platform**: iOS e Android via Expo  
**Project Type**: mobile-app front-end only  
**Performance Goals**: abrir shell inicial do app em ate 2 segundos em ambiente de desenvolvimento comum; interacoes locais de navegacao e resposta de card perceptivelmente imediatas; transicoes principais em 60 fps quando possivel  
**Constraints**: offline-capable, front-end only, sem dependencia de execucao server-side no fluxo principal, separacao explicita entre UI/dominio/dados, base simples para evolucao incremental  
**Scale/Scope**: fundacao inicial com 3 areas principais do produto, pronta para crescer para autenticacao, revisao, decks, preferencias e sincronizacao de milhares de cards ao longo da evolucao

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0

- PASS: O escopo permanece front-end only; Firebase foi tratado como servico remoto externo e nao como parte central do repositrio.
- PASS: A arquitetura proposta isola regras de revisao e evolucao para uma camada de dominio separada da UI.
- PASS: A fundacao considera offline-first desde o inicio por meio de persistencia local e adapters substituiveis.
- PASS: O shell inicial prioriza o produto de memorizacao com Home, Revisao e Decks, alinhado ao objetivo de parecer com Anki.
- PASS: A estrutura escolhida privilegia simplicidade e legibilidade, sem introduzir abstrações prematuras alem do necessario.

### Post-Phase 1

- PASS: `research.md` fixa escolhas tecnicas sem violar o principio de KISS.
- PASS: `data-model.md` preserva historico, versionamento de cards e separacao clara entre entidades.
- PASS: `contracts/app-shell.md` define limites de UI e adapters sem contaminar a logica central.
- PASS: `quickstart.md` permite implementar e validar a fundacao mantendo foco no fluxo principal do produto.

## Project Structure

### Documentation (this feature)

```text
specs/001-setup-expo-app/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── app-shell.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── _layout.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── review.tsx
│   └── decks.tsx
└── modal/
    └── deck-editor.tsx

src/
├── application/
│   ├── boot/
│   ├── navigation/
│   └── use-cases/
├── domain/
│   ├── cards/
│   ├── decks/
│   ├── reviews/
│   └── scheduling/
├── data/
│   ├── adapters/
│   │   ├── local/
│   │   └── remote/
│   ├── repositories/
│   └── sync/
├── state/
│   ├── app-store/
│   ├── study-store/
│   └── deck-store/
├── ui/
│   ├── components/
│   ├── screens/
│   └── theme/
└── shared/
    ├── types/
    ├── validation/
    └── utils/

assets/
validation/
└── manual-checklists/
```

**Structure Decision**: Projeto unico de aplicativo mobile com entrada de rotas em `app/` e arquitetura por camadas em `src/`. Esta escolha preserva simplicidade para a fundacao do front-end e, ao mesmo tempo, separa claramente shell visual, dominio deterministico, estado local e adapters de persistencia/sincronizacao.

## Complexity Tracking

Nenhuma violacao da constituicao exige justificativa nesta fase.
