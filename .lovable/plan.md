# Direção visual "Dossiê" v2 — base escolhida, ajustes pendentes de mockup

Discussão/mockup apenas. Nada implementado. A paleta atual (plum, cream, coral, solar, ink — tokens de `src/styles.css`) é mantida. A dona do projeto escolheu a Direção B ("Dossiê") como base e pediu estes apertos antes da implementação:

## Regras v2 da direção Dossiê

1. **Rigor visível:** todo número-manchete carrega legenda de fonte/data em mono pequeno, colada e sempre visível (nunca tooltip).
2. **Hierarquia de números:** 1–3 números monumentais por página (o achado central); todo o resto em escala menor, claramente "de apoio".
3. **Ilustração:** trocar a ilustração atual (pessoas fofinhas na escada). Duas variantes a decidir: (a) fotografia documental real (atos, urnas, plenário, tribunais) em duotone plum/ink; (b) ilustração só com formas geométricas abstratas (escadas, portas, urnas, prédios), sem figura humana.
4. **Sombra offset dosada:** efeito de recorte colado só no número-manchete e no card do achado principal; barras e tabelas de apoio ficam discretas (borda fina, sem sombra).
5. **Cor com regra semântica fixa:** coral só para lacuna/alerta declarada; solar só como marca-texto da frase-chave do achado; plum é a cor neutra de dado. Nada de cor decorativa fora disso.
6. **Duas velocidades:** tratamento monumental (painel ink full-bleed, tipografia gigante) só na abertura de cada eixo/página (capa de capítulo); o corpo de dado (tabelas por estado/partido etc.) rola em modo consulta sóbrio, mantendo a identidade.
7. **Cada eixo como capítulo:** rotas despublicadas (barreiras, dinheiro etc.) ganham a mesma capa de dossiê, com a lacuna já declarada como manchete de capítulo ("aguardando fonte oficial") no painel ink — estilização da mensagem existente, sem inventar dado.
8. **Acessibilidade:** contraste WCAG AA mínimo em painel ink + creme + marca-texto solar; escala tipográfica responsiva real no mobile (não só redução proporcional).
9. **Transição sutil entre painéis (opcional):** movimento discreto de "virada de capítulo" ao rolar, sempre respeitando `prefers-reduced-motion`.

## Próximo passo

Mockups estáticos v2 da seção de abertura (hero + primeiro achado) nas duas variantes de ilustração (v2-foto e v2-formas), para a dona escolher. Depois da escolha: plano de implementação detalhado (tokens, utilitários, componentes, capas para eixos despublicados), sem tocar em dados nem na fotografia TSE, e sem publicar.

Mockups são ilustrativos: textos e números neles não são dados do projeto.
