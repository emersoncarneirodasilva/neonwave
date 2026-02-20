# 🌊 NeonWave

**NeonWave** é um ecossistema musical desktop completo para download e reprodução de áudio. Desenvolvido com **Electron**, **React 19** e **TypeScript**, ele une a liberdade do armazenamento local com uma interface futurista, fluida e altamente personalizável.

---

## 📌 Sobre o Projeto

O NeonWave nasceu com o objetivo de ser um downloader e player de músicas pessoal, simples de usar, visualmente impactante e totalmente offline. Ele resolve o desafio de centralizar músicas de diversas fontes em um único lugar, com uma organização inteligente e estética impecável.

### ⚡ Pilares do Projeto

* **Autonomia:** Download e reprodução local sem dependência de streaming constante.
* **Performance:** Arquitetura segregada entre Processo Main (Node/Electron) e Render (React/Vite).
* **Estética:** Interface imersiva com suporte a múltiplos temas visuais.
* **Robustez:** Persistência de dados com Prisma ORM e SQLite.

---

## ✨ Funcionalidades

### 🎶 Gerenciamento de Mídia

* **Download Inteligente:** Captura de áudio via URLs (YouTube) com conversão automática.
* **Processamento de Áudio:** Integração com `ffmpeg` para garantir compatibilidade de formatos.
* **Organização Automática:** Classificação por Gênero, Artista e Álbum via metadados.

### 🎧 Experiência do Player

* **Player Nativo:** Controles completos de reprodução com interface reativa.
* **Navegação SPA:** Transições instantâneas entre telas usando `React Router`.
* **Animações de Alta Fidelidade:** Feedback visual e microinterações com `Framer Motion`.

---

## 🎨 Temas e Identidade Visual

O NeonWave oferece uma **galeria de temas dinâmicos** que alteram completamente a atmosfera do app. A interface utiliza técnicas avançadas de CSS, como a elipse de profundidade (`44% 33% at 52% 63%`) para criar camadas de transparência e foco.

* **Tema Cyberpunk City:** Alto contraste com tons de neon rosa, roxo e azul.
* **Tema Ocean Abyss:** Gradientes suaves em tons de ciano e azul marinho.
* **Tema Summer Breeze:** Uma paleta quente inspirada no estilo verão/praia.
* **Customização:** Sistema de temas baseado em variáveis do **Tailwind CSS 4.0**, permitindo a troca de esquemas de cores em tempo real.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma estrutura modular e organizada para garantir escalabilidade:

```text
neonwave/
├── electron/                 # Processo Principal (Main Process)
│   ├── backend/              # Lógica de Negócio e Infraestrutura
│   │   ├── container/        # Injeção de dependências / Singleton
│   │   ├── controllers/      # Handlers de comunicação IPC
│   │   ├── core/             # Configurações centrais do sistema
│   │   ├── ipc/              # Definições de canais de comunicação
│   │   ├── repositories/     # Abstração de acesso ao banco Prisma
│   │   ├── services/         # DownloadService, MusicService, etc.
│   │   └── validations/      # Schemas de validação com Zod
│   ├── main.ts               # Ponto de entrada do Electron
│   └── preload.ts            # Ponte de segurança entre Main e Render
├── prisma/                   # Schema e Migrations do banco SQLite
├── resources/                # Binários externos (yt-dlp, ffmpeg)
└── render/                   # Interface do Usuário (React + Vite)
    └── src/
        ├── api/              # Chamadas IPC tipadas
        ├── app/              # Configurações globais e rotas
        ├── components/       # Componentes de UI (Neon style)
        ├── contexts/         # Estados globais (PlayerContext, ThemeContext)
        ├── hooks/            # Hooks customizados para lógica de UI
        └── main.tsx          # Inicialização do React

```

---

## 🛠️ Tecnologias

### **Backend & Desktop**

* **Electron:** Framework base desktop.
* **Prisma ORM & SQLite:** Persistência de dados local segura e leve.
* **FFmpeg & yt-dlp:** Processamento de mídia de alto desempenho.

### **Frontend & UI**

* **React 19:** UI declarativa e moderna.
* **Tailwind CSS 4.0:** Estilização com performance máxima.
* **Framer Motion:** Engine de animações e transições.
* **Lucide React:** Iconografia minimalista.

---

## 🚀 Como Rodar o Projeto

### 🔧 Desenvolvimento

1. **Instale as dependências da raiz:**
```bash
npm install

```


2. **Instale as dependências do Frontend:**
```bash
cd render && npm install && cd ..

```


3. **Inicie o ambiente:**
```bash
npm run dev

```



### 📦 Build de Produção

Para gerar o executável portátil na pasta `/release`:

```bash
npm run dist

```

---

## 👤 Autor

**Emerson Carneiro da Silva**

---

## 📜 Licença

Este projeto está sob a licença [MIT](https://www.google.com/search?q=LICENSE).

---

A estrutura ficou bem fiel aos seus arquivos agora, especialmente com a divisão clara dentro de `electron/backend`. O que achou dessa versão final?
