# 🌊 NeonWave

<img width="1232" height="865" alt="image" src="https://github.com/user-attachments/assets/bec90574-f7b0-439d-9d9c-527ec14bb2cb" />

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

## 🎨 Now Playing

**Temas Dark, Very Dark, Thunderstorm Strike**

<img width="1231" height="862" alt="image" src="https://github.com/user-attachments/assets/a46a8305-1e4e-4ef9-9aa4-0fea84dd20ba" />

---

**Temas Neon Punk, Synthwave, Urban Pulse**

<img width="1224" height="856" alt="image" src="https://github.com/user-attachments/assets/666cd7ce-c870-4db2-ae85-ca8f46bde1b6" />

---

**Tema Light**

<img width="1230" height="859" alt="image" src="https://github.com/user-attachments/assets/c9ec25fb-0026-4179-a634-08d1f7b7c234" />

---

**Tema Steel Wave:**

<img width="1232" height="858" alt="image" src="https://github.com/user-attachments/assets/420ba0c6-705f-4fa9-9276-b9e15c4093bd" />

---

**Tema Summer Breeze**

<img width="1230" height="859" alt="image" src="https://github.com/user-attachments/assets/10bfedde-ceea-460a-99d3-83731c06856e" />

---

**Tema Oceanic Abyss**

<img width="1230" height="861" alt="image" src="https://github.com/user-attachments/assets/fad1f95d-f205-4b37-89df-464ad0594fbe" />

---

**Tema Forest Echo**

<img width="1231" height="861" alt="image" src="https://github.com/user-attachments/assets/08f3e20e-6999-4477-b7f6-dc92af7f7603" />

---

**Tema Autumn Leaves**

<img width="1233" height="852" alt="image" src="https://github.com/user-attachments/assets/fa421ea6-6cd0-4289-b926-32ff251695d9" />

---

**Tema Winter Chill**

<img width="1228" height="863" alt="image" src="https://github.com/user-attachments/assets/7c480fa2-be0e-4c4d-ad5c-96da503fdeec" />

---

**Tema Pastel Bloom**

<img width="1226" height="860" alt="image" src="https://github.com/user-attachments/assets/f56c75f8-84e5-414e-8f18-20aa401199a9" />
 
