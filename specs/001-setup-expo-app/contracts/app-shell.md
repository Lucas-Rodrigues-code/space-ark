# Contract: App Shell

## Purpose

Definir o contrato funcional da fundacao do app front-end para garantir consistencia entre navegacao, estado local e adapters externos.

## Route Contract

### Primary Areas
- `/(tabs)/index`: Home
- `/(tabs)/review`: Revisao
- `/(tabs)/decks`: Decks
- `/modal/deck-editor`: criacao ou edicao de deck

### Route Expectations
- O app deve abrir na Home.
- A Home deve expor acesso imediato para iniciar revisao.
- A area de Revisao deve poder operar sem backend configurado.
- A area de Decks deve permitir evolucao para listagem, detalhes e manutencao.

## UI State Contract

### AppBootstrapState
- `status`: `idle | loading | ready | error`
- `hasLocalData`: boolean
- `hasRemoteConfig`: boolean
- `lastSyncAt`: nullable datetime
- `errorMessage`: nullable string

### StudySessionState
- `sessionId`: nullable string
- `deckIds`: string[]
- `currentCardId`: nullable string
- `remainingCount`: number
- `answeredCount`: number
- `revealed`: boolean
- `offline`: boolean

### DeckListState
- `items`: deck summary list
- `selectedDeckId`: nullable string
- `filter`: text or tag filter
- `status`: `idle | loading | ready | error`

## Adapter Contracts

### AuthGateway
- Responsabilidade: encapsular autenticacao remota futura.
- Required operations:
  - `getCurrentUser()`
  - `signIn()`
  - `signOut()`

### LocalStudyRepository
- Responsabilidade: persistir entidades de estudo localmente.
- Required operations:
  - `loadDecks()`
  - `loadDueCards()`
  - `saveDeck()`
  - `saveReviewEvent()`
  - `loadPreferences()`
  - `savePreferences()`

### RemoteSyncGateway
- Responsabilidade: sincronizacao futura com Firebase.
- Required operations:
  - `pullChanges()`
  - `pushChanges()`
  - `resolveConflicts()`

## Validation Rules
- UI nao deve acessar SDKs remotos diretamente.
- Stores nao devem conter regras de agendamento espalhadas fora do dominio.
- Rotas principais devem continuar disponiveis mesmo sem sessao autenticada.
- Falhas de adapter devem degradar de forma controlada sem impedir o shell do app de abrir.
