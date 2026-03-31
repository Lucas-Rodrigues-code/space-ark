# Research: Fundacao do App Frontend

## Decision 1: Usar TypeScript com Expo no front-end
- Decision: Adotar TypeScript como linguagem base do projeto Expo.
- Rationale: O dominio de memorizacao e a evolucao para agendamento deterministico exigem tipos fortes, contratos claros entre camadas e maior seguranca para refactors.
- Alternatives considered: JavaScript puro foi descartado por aumentar risco de acoplamento e regressao em regras de dominio.

## Decision 2: Usar Expo Router para o shell inicial do app
- Decision: Adotar Expo Router para estruturar a navegacao inicial.
- Rationale: Ele combina bem com Expo, reduz boilerplate, organiza o shell por arquivos e facilita a evolucao das areas Home, Revisao e Decks.
- Alternatives considered: React Navigation foi considerado viavel, mas exigiria mais configuracao manual para uma fundacao cujo objetivo principal e velocidade com estrutura simples.

## Decision 3: Iniciar com shell de produto em Home, Revisao e Decks
- Decision: A fundacao inicial tera tres areas principais: Home, Revisao e Decks.
- Rationale: Esse recorte cobre o nucleo do produto inspirado no Anki sem inflar a base com fluxos secundarios cedo demais.
- Alternatives considered: Uma tela unica foi descartada por nao validar a arquitetura de navegacao; incluir Configuracoes e Autenticacao agora foi descartado por ampliar escopo sem valor imediato para o shell.

## Decision 4: Persistencia local em duas camadas
- Decision: Usar AsyncStorage para preferencias e hidratacao leve de estado, deixando SQLite local como caminho previsto para dados estruturados de estudo.
- Rationale: Isso atende a fundacao offline-first sem introduzir complexidade desnecessaria logo na primeira entrega, mas preserva um caminho claro para cards, decks e historico.
- Alternatives considered: Usar apenas AsyncStorage para tudo foi descartado por limitar a evolucao do modelo de dados; adotar uma solucao mais pesada de banco local agora foi descartado por excesso de complexidade.

## Decision 5: Firebase como adapter remoto, nao como centro da arquitetura
- Decision: Modelar Firebase como integracao externa por adapters de dados e servicos.
- Rationale: Isso mantem a regra de negocio no cliente, protege o fluxo principal offline e evita contaminar o dominio com detalhes de backend.
- Alternatives considered: Acoplar autenticacao e persistencia remota desde a base do app foi descartado por contrariar o escopo front-end only e a constituicao do projeto.

## Decision 6: Validacao manual como politica da fundacao
- Decision: Adotar validacao manual reproduzivel como mecanismo oficial de verificacao nesta fase da aplicacao.
- Rationale: A diretriz atual do projeto descarta testes automatizados e exige que cada entrega tenha passos claros de verificacao funcional por execucao local e navegacao real.
- Alternatives considered: Introduzir pilha automatizada de testes agora foi descartado por contrariar a politica de desenvolvimento definida para este repositorio.

## Decision 7: Conjunto minimo de bibliotecas essenciais agora
- Decision: Incluir apenas dependencias que sustentam shell, estado, validacao e persistencia local da fundacao.
- Rationale: Expo, Expo Router, Zustand, Zod, AsyncStorage, Expo SQLite e React Native SVG cobrem a base sem superdimensionar a stack.
- Alternatives considered: Introduzir bibliotecas extras como gerenciadores de server state ou camadas de sync neste momento foi descartado por antecipar problemas que ainda nao existem na fundacao.
