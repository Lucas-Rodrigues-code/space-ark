# Space Ark - Constituição do Produto

## Princípios Centrais

### I. Revisão vem primeiro
O produto deve ser desenhado em torno do fluxo principal de estudo, não em torno de cadastro ou configuração. A experiência principal deve se parecer com o Anki: abrir o app, ver o que está pendente hoje, iniciar revisão com um toque, revelar a resposta e registrar a qualidade da lembrança imediatamente.

### II. Domínio de memorização isolado e determinístico
Toda lógica de repetição espaçada, cálculo de intervalo, estado de aprendizagem, lapse, reintrodução e prioridade diária deve viver em uma camada de domínio independente da interface. Dado o mesmo estado de card e a mesma resposta do usuário, o resultado deve ser sempre o mesmo.

### III. Offline-first real
Revisar cards, consultar decks, responder sessões e registrar histórico devem funcionar sem rede. Sincronização com Firebase é um mecanismo de transporte e persistência remota consumido pelo app, não um pré-requisito para estudar.

### IV. Histórico é patrimônio do usuário
O histórico de revisão nunca pode ser perdido por refactors, sync ou mudança de algoritmo. Toda alteração relevante em cards, notas, decks e parâmetros de agendamento deve preservar rastreabilidade, versão e possibilidade de migração.

### V. Simplicidade de uso acima de ornamentação
A interface deve ser minimalista, rápida e silenciosa, com foco total em memorização. Elementos visuais, animações e textos só são aceitáveis quando melhoram compreensão, velocidade ou confiança operacional.

## Diretrizes de Produto

### Escopo deste repositório
- Este projeto implementa somente o front-end do app.
- Firebase é a infraestrutura de backend consumida pelo cliente, não o foco de implementação deste repositório.
- Regras de negócio críticas devem existir no domínio do app e não depender de execução server-side para o fluxo principal de estudo.
- Integrações com Auth, Firestore e Functions devem ser tratadas como adapters de dados e serviços externos.

### Arquitetura obrigatória
- Frontend em React Native com Expo.
- Serviços remotos via Firebase, usando Firestore, Auth e Functions quando necessário.
- Estado local com Zustand.
- Código organizado em camadas claras: UI, aplicação, domínio e dados.

### Modelo de dados obrigatório
- O sistema deve distinguir nota, card, deck e evento de revisão.
- Flashcards devem ser versionados para permitir evolução sem apagar histórico.
- O histórico de revisões deve ser append-only sempre que possível.
- Alterações estruturais em dados exigem estratégia explícita de migração.
- Conflitos de sincronização devem favorecer preservação de histórico e consistência do agendamento.

### Experiência de estudo inspirada no Anki
- A tela inicial deve priorizar revisões pendentes, novos cards e cards em aprendizado.
- O fluxo padrão de revisão deve seguir a sequência: pergunta, revelar resposta, avaliar recordação.
- A resposta do usuário deve gerar feedback imediato sobre o novo estado do card.
- O sistema deve suportar decks e organização suficiente para estudo recorrente em lotes.
- A UX deve minimizar fricção: no máximo duas ações principais para começar a revisar.
- Gamificação não pode competir com clareza, ritmo e foco cognitivo.

### Regras de agendamento
- O algoritmo de repetição espaçada deve ser determinístico, configurável e encapsulado.
- Mudanças no algoritmo exigem versionamento e plano de migração dos cards existentes.
- Cada revisão deve registrar a nota dada pelo usuário, atualizar o estado do card e recalcular o próximo intervalo.
- O sistema deve suportar pelo menos os estados conceituais de novo, aprendizado, revisão e reaprendizado.
- Limites diários e priorização de revisão devem ser tratados como regras explícitas de domínio.

## Regras de Qualidade

- Código deve privilegiar legibilidade, previsibilidade e baixo acoplamento.
- Regras de repetição espaçada não podem ficar espalhadas em componentes de UI.
- Toda feature que afete cards, histórico ou agendamento deve ser testável de forma isolada.
- Mudanças em persistência e sync devem considerar comportamento offline antes de considerar conveniência de implementação.
- A camada de integração com Firebase deve ser substituível e não pode contaminar a lógica central de revisão.
- Novas funcionalidades não devem degradar a velocidade do fluxo principal de revisão.

## Governança

- Esta constituição tem precedência sobre decisões locais de implementação.
- Toda mudança que afete modelo de dados, algoritmo de revisão ou experiência principal de estudo deve ser avaliada contra os princípios centrais.
- Se uma decisão aproximar o produto do Anki em clareza, previsibilidade e eficiência de revisão, ela tem prioridade sobre alternativas mais vistosas ou mais simples de construir.
- Exceções devem ser documentadas com justificativa técnica e impacto em migração, histórico e UX.

**Versão**: 1.1.1 | **Ratificada em**: 2026-03-31 | **Última alteração**: 2026-03-31