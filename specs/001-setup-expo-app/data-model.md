# Data Model: Fundacao do App Frontend

## Overview

A fundacao do app precisa acomodar o modelo central de um produto de flashcards inspirado no Anki, preservando separacao entre conteudo, agenda de estudo, historico e configuracao local.

## Entities

### Note
- Purpose: Representa o conteudo autoral criado pelo usuario.
- Fields:
  - `id`
  - `deckId`
  - `fields`
  - `tags`
  - `templateId`
  - `version`
  - `createdAt`
  - `updatedAt`
- Validation rules:
  - Deve pertencer a um deck.
  - Deve manter versao para rastrear alteracoes.
  - Campos obrigatorios do template nao podem ficar vazios.

### Card
- Purpose: Representa uma unidade revisavel derivada de uma note.
- Fields:
  - `id`
  - `noteId`
  - `deckId`
  - `cardType`
  - `state`
  - `dueAt`
  - `stability`
  - `difficulty`
  - `stepIndex`
  - `lapseCount`
  - `schedulingVersion`
  - `createdAt`
  - `updatedAt`
- Validation rules:
  - Deve referenciar uma note existente.
  - `state` deve ser um de: `new`, `learning`, `review`, `relearning`.
  - Deve manter `schedulingVersion` para permitir migracoes de algoritmo.

### Deck
- Purpose: Agrupa notes e cards em uma colecao de estudo.
- Fields:
  - `id`
  - `name`
  - `description`
  - `dailyNewLimit`
  - `dailyReviewLimit`
  - `archived`
  - `createdAt`
  - `updatedAt`
- Validation rules:
  - Nome deve ser unico por usuario no escopo local.
  - Limites diarios devem ser inteiros nao negativos.

### ReviewEvent
- Purpose: Registra cada resposta dada pelo usuario durante o estudo.
- Fields:
  - `id`
  - `cardId`
  - `sessionId`
  - `rating`
  - `reviewedAt`
  - `previousState`
  - `nextState`
  - `previousDueAt`
  - `nextDueAt`
  - `schedulingVersion`
- Validation rules:
  - Deve ser append-only.
  - Deve registrar transicao suficiente para auditoria e recalculo.
  - `rating` deve seguir o conjunto de respostas suportadas pela UX de revisao.

### StudySession
- Purpose: Representa uma sessao local de estudo ativa ou concluida.
- Fields:
  - `id`
  - `startedAt`
  - `endedAt`
  - `mode`
  - `deckIds`
  - `cardQueue`
  - `answeredCount`
  - `offline`
- Validation rules:
  - Deve poder existir sem backend configurado.
  - `cardQueue` deve refletir apenas cards elegiveis no inicio da sessao.

### AppPreferences
- Purpose: Armazena configuracoes locais do app e do shell inicial.
- Fields:
  - `themePreference`
  - `studyReminderEnabled`
  - `lastOpenedDeckId`
  - `devFlags`
- Validation rules:
  - Deve ser persistivel localmente.
  - Nao pode bloquear a abertura do app se estiver ausente ou corrompido.

## Relationships
- Um `Deck` possui muitas `Note`.
- Uma `Note` gera um ou muitos `Card`.
- Um `Card` possui muitos `ReviewEvent`.
- Uma `StudySession` agrega muitos `ReviewEvent`.
- `AppPreferences` e independente das entidades de estudo.

## State Transitions

### Card lifecycle
- `new` -> `learning`: quando o card entra em estudo pela primeira vez.
- `learning` -> `review`: quando completa os passos iniciais com sucesso.
- `review` -> `relearning`: quando falha apos ja estar em revisao.
- `relearning` -> `review`: quando conclui a reaprendizagem.

## Persistence Boundaries
- `AppPreferences` pode iniciar em AsyncStorage.
- `Deck`, `Note`, `Card`, `ReviewEvent` e `StudySession` devem ser modelados para armazenamento estruturado local.
- Sincronizacao remota futura deve operar sobre adapters sem alterar as entidades centrais.
