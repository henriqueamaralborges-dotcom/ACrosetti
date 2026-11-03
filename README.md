# Site Pessoal — Henrique Amaral Borges

Projeto desenvolvido com base na extração e reprodução integral do **Design System oficial de [landonorris.com](https://landonorris.com/)** (desenvolvido pela premiada agência *OFF+BRAND*). O projeto une o universo do automobilismo e design de alta performance à **Inteligência Artificial**, **Engenharia Mecatrônica**, **Desenvolvimento de Jogos** e **Produção Audiovisual**.

---

## 🎨 Especificações Técnicas do Design System (OFF+BRAND // Lando Norris)

### 1. Design Tokens & Cores Oficiais
- **Electric Neon Lime (`#D2FF00`)**: Cor primária de destaque de alta voltagem (`--color--lime`), aplicada em títulos de impacto, botões principais, seleções ativas, anéis do HUD e partículas.
- **Dark Racing Olive Green (`#282C20`)**: Cor secundária escura (`--color--dark-green`), aplicada como **cor de texto sobre os botões neon lime** e rótulos de contraste, reproduzindo a identidade visual exata de Lando Norris.
- **Deep Matte Obsidian (`#111112`, `#161619`, `#1B1B20`)**: Superfícies escuras que compõem o canvas, painéis e cartões Bento com acabamento fosco refinado.
- **Warm Editorial Off-White (`#F4F4ED`)**: Branco quente editorial (`--color--white`) para textos de leitura, títulos e bordas finas com acabamento premium.
- **Telemetry Grey (`#B9BBAD`, `#B4B8A5`, `#DDE1D2`)**: Tons neutros para coordenadas técnicas, colchetes, metadados e tags de status.
- **McLaren Speed Papaya (`#FF6B00`)** & **Cyber Cyan (`#00F0FF`)**: Acentos esportivos e de engenharia mecatrônica.

### 2. Tipografia & Escala Hierárquica
- **Primary Display & Headings (`Mona Sans`, 800/900)**: Tipografia variável com tracking ajustado (`letter-spacing: -0.04em`), proporções condensadas e efeito *outline* vazado com traço preciso.
- **Body & Subtitles (`Mona Sans` & `Space Grotesk`)**: Tipografia geométrica grotesca altamente legível e moderna.
- **Technical Telemetry & Labels (`JetBrains Mono`, 500/700)**: Monospace para dados de coordenadas, contadores, rótulos de cockpit (`[ 01 // OVERVIEW ]`) e tags.

### 3. Componentes & Identidade
- **Botões Oficiais (`.btn-primary`)**:
  - Altura: `3rem` (48px).
  - Raio de curvatura: `0.54rem` (`--radius--small`).
  - Fundo: Neon Lime (`#D2FF00`) com texto Dark Olive (`#282C20`).
  - Efeito hover: Inversão suave para Off-White e preto com elevação e brilho volumétrico.
- **Segmented Capsule Switcher (On-Track // Off-Track)**:
  - Controle em cápsula fosca (`--radius--pill`) para alternância dinâmica entre visual fotográfico oficial e simulação interativa 3D em Canvas.
- **Hero Monumental**: Título gigante com camadas staggered, monograma geométrico exclusivo (`HAB`) e telemetria instantânea.
- **Velocity Marquee Ticker**: Faixa angular com inclinação contínua e texto em alta velocidade.
- **Bento Grid com Cantos em Neon Brackets**: Cartões assimétricos modulares com acabamento fosco e realces em cantos de 90°.
- **Cockpit Audio Dock & Sound FX**: Dock de reprodução de trilha sonora ambiente com barras de equalizador animadas em Neon Lime.

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
| **Trajetória Escolar** | Timeline detalhada: **Colégio Vital Brasil**, **Colégio Agostiniano Mendel**, **Colégio Exatus** e formação atual no **Colégio FECAP (Técnico em IA)** |
| **Rodapé / Contato** | E-mail com cópia rápida (`henriqueamaralborges@gmail.com`), WhatsApp direto (`(11) 97481-4897`), Instagram (`@henrique_aborgees`), LinkedIn e GitHub |

---

## 🚀 Como Visualizar o Projeto

Para abrir no navegador:
1. Abra o arquivo `index.html` localizado na pasta:
   ```
   C:\Users\26012481\Documents\GitHub\ACrosetti\index.html
   ```
   diretamente no Chrome, Edge ou navegador de sua preferência.
2. Ou inicie um servidor local HTTP simples (ex: `npx serve` ou extensão *Live Server*).

---

## 📁 Estrutura de Arquivos

```
ACrosetti/
├── index.html            # Estrutura semântica e tipografia Mona Sans
├── styles.css            # Design System oficial idêntico a landonorris.com
├── main.js               # Canvas 3D, Web Audio API, animações e interações
├── README.md             # Especificações técnicas e documentação
└── assets/               # Imagens, logotipos oficiais, SVGs e áudio
    ├── hab-logo.svg
    ├── henrique-portrait.jpg
    ├── cyber-core.svg
    ├── game-jam.svg
    ├── audiovisual.svg
    ├── cyber-soundtrack.wav
    ├── logo-lokar.png
    ├── logo-global-game-jam.png
    ├── logo-vital-brazil.png
    ├── logo-agostiniano-mendel.png
    ├── logo-exatus.png
    └── logo-fecap.png
```
