# Site Pessoal — Henrique Amaral Borges

Projeto desenvolvido com base na extração do **Design System oficial de [landonorris.com](https://landonorris.com/)** (desenvolvido pela premiada agência *OFF+BRAND*). O projeto une o universo do automobilismo de alta performance à **Inteligência Artificial**, **Mecatrônica**, **Desenvolvimento de Jogos** e **Produção Audiovisual**.

---

## 🎨 Especificações do Design System Extraído

### 1. Paleta de Cores (High Voltage & Dark Carbon)
- **Neon Lime / Electric Yellow (`#D2FF00`)**: Cor primária de destaque de alta voltagem, aplicada em títulos dinâmicos, botões chanfrados, bordas de foco e partículas.
- **Deep Carbon / Canvas Black (`#08080A`, `#0E0E12`, `#14141A`)**: Superfícies escuras inspiradas em fibra de carbono, criando alto contraste e atmosfera técnica imersiva.
- **Cyber Cyan (`#00F0FF`)**: Acento secundário para métricas de rede neural, tags de telemetria e anéis do HUD.
- **Speed Red (`#FF334B`)**: Indicadores de gravação e status de alerta.
- **Clean Platinum (`#FFFFFF`, `#E4E4E7`)**: Tipografia de leitura e contrastes em títulos.

### 2. Tipografia e Escala Hierárquica
- **Display Headings (`Syne`, 800/900)**: Títulos de alto impacto com inclinação aerodinâmica (`skewX(-4deg)`), proporções condensadas e efeito *outline* vazado.
- **Body (`Space Grotesk`, 400/500/600/700)**: Tipografia geométrica legível para parágrafos, subtítulos e cartões de conteúdo.
- **Telemetry & Labels (`JetBrains Mono`, 500/700)**: Monospace para coordenadas, rótulos de status (`[ 01 // OVERVIEW ]`), contadores e tags.

### 3. Componentes & Layout
- **Hero de Impacto**: Cabeçalho monumental com monograma geométrico exclusivo (`HAB`), tags de telemetria e simulação interativa em Canvas 3D.
- **Marquee Ticker Contínuo**: Faixa em rolagem infinita com palavras-chave e efeitos de velocidade.
- **Grid de Destaques Assimétrico (Bento Grid)**: Cartões modulares com cantos em brackets de neon, badges e mídias vetoriais customizadas.
- **Timeline Acadêmica & HUD de Competências**: Estrutura cronológica com marcadores ativos e matriz técnica de hard e soft skills.
- **Microinterações e Áudio**:
  - Brilho de cursor dinâmico (`cursor-glow`).
  - Efeitos sonoros sintetizados via Web Audio API (opcional, com botão liga/desliga).
  - Contador numérico animado acionado por rolagem (`IntersectionObserver`).
  - Copiador de e-mail de um clique com notificação *toast*.

---

## 📂 Mapeamento de Conteúdo Realizado

| Seção Original (Lando Norris) | Mapeamento no Projeto (Henrique Amaral Borges) |
|---|---|
| **Header / Logo** | Monograma **HAB** com acento em neon lime (`assets/hab-logo.svg`) |
| **Hero / Driver Name** | **HENRIQUE AMARAL BORGES** com tipografia display monumental |
| **Categoria / Profissão** | **Estudante do 1º ano do Ensino Médio Técnico em Inteligência Artificial e futuro Engenheiro Mecatrônico** |
| **Grid Destaque 1** | **Finalista da Global Game Jam Next** (etapa escolar e campeonato geral) |
| **Grid Destaque 2** | **Captação de patrocínio da Lokar Audiovisual** na Fecart e atuação profissional por 1 mês |
| **Biografia / Sobre** | &ldquo;*Sou um estudante focado em tecnologia, com experiência prática em eventos competitivos e no setor audiovisual. Minha trajetória acadêmica inclui passagens pelo Vital Brasil, Agostiniano Mendel e Exatus.*&rdquo; |
| **Trajetória Escolar** | Timeline detalhada: **Colégio Vital Brasil**, **Colégio Agostiniano Mendel**, **Colégio Exatus** e formação atual no **Técnico em IA** |
| **Rodapé / Contato** | E-mail com cópia rápida (`henriqueamaralborges@gmail.com`), WhatsApp direto (`(11) 97481-4897`), Instagram (`@henrique_aborgees`), LinkedIn e GitHub |

---

## 🚀 Como Visualizar o Projeto

Para abrir no navegador:
1. Abra o arquivo `index.html` localizado na pasta:
   ```
   C:\Users\26012481\.gemini\antigravity\scratch\henrique-amaral-portfolio\index.html
   ```
   diretamente no Chrome, Edge ou navegador de sua preferência.
2. Ou inicie um servidor local HTTP simples (ex: `npx serve` ou extensão *Live Server*).

---

## 📁 Estrutura de Arquivos

```
henrique-amaral-portfolio/
├── index.html            # Estrutura semântica e acessível
├── styles.css            # Design System completo e responsivo
├── main.js               # Canvas 3D, Web Audio API, animações e interações
├── README.md             # Documentação do projeto
└── assets/
    ├── hab-logo.svg      # Monograma geométrico de marca
    ├── cyber-core.svg    # HUD vetorial de telemetria mecatrônica & IA
    ├── game-jam.svg      # Visual temático da Global Game Jam Next
    └── audiovisual.svg   # Visual temático da Lokar Audiovisual / Fecart
```
