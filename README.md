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

### 💾 Infraestrutura Local

* **Banco de Dados:** Persistência offline-first utilizando **SQLite** e **Prisma**.
* **Validação:** Esquemas de dados estritamente validados com **Zod**.
* **Portabilidade:** Build configurado para gerar um executável portátil (.exe) para Windows.

---

## 🎨 Temas e Identidade Visual

Diferente de players convencionais, o NeonWave oferece uma **galeria de temas dinâmicos** que alteram completamente a atmosfera do app. A interface utiliza técnicas avançadas de CSS, como a elipse de profundidade (`44% 33% at 52% 63%`) para criar camadas de transparência.

* **Tema Cyberpunk City:** Alto contraste com tons de neon rosa, roxo e azul.
* **Tema Ocean Abyss:** Gradientes suaves em tons de ciano e azul marinho.
* **Tema Summer Breeze:** Uma paleta quente inspirada no estilo verão/praia.
* **Customização:** Sistema de temas baseado em variáveis do **Tailwind CSS**, permitindo a troca de esquemas de cores sem recarregar a aplicação.

---

## 🛠️ Tecnologias

### **Backend (Electron & Node.js)**

* **Electron:** Framework base para aplicação desktop.
* **Prisma ORM:** Abstração de banco de dados com Tipagem Total.
* **Better-SQLite3:** Engine de banco de dados rápida e leve.
* **FFmpeg & yt-dlp:** Ferramentas nativas para manipulação e download de mídia.

### **Frontend (React Stack)**

* **React 19:** A versão mais recente para uma UI declarativa.
* **Vite:** Tooling de build ultrarrápido.
* **Tailwind CSS 4.0:** Estilização moderna e utilitária.
* **Framer Motion:** Orquestração de animações complexas.

---

## 🏗️ Arquitetura do Projeto

O projeto utiliza uma separação clara de responsabilidades:

```text
neonwave/
├── electron/         # Lógica de sistema, File System e Banco de Dados
│   ├── Services/     # DownloadService, MusicService
│   ├── Controllers/  # Intermediação IPC
│   └── Prisma/       # Schema e Migrations (dev.db)
└── render/           # Interface do Usuário (React App)
    ├── components/   # UI Reutilizável
    ├── hooks/        # Lógica de estado e áudio
    └── themes/       # Definições de estilos neon

```

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

## 🧩 Desafios Técnicos Resolvidos

* **Integração de Binários:** Empacotamento do `yt-dlp` e `ffmpeg` dentro do ASAR do Electron.
* **IPC Bridge:** Comunicação tipada entre o frontend e o sistema operacional.
* **Banco de Dados em Produção:** Configuração do Prisma para ler/escrever no SQLite dentro do diretório de dados do usuário após o build.

---

## 👤 Autor

**Emerson Carneiro da Silva**

---

## 📜 Licença

Este projeto está sob a licença [MIT](https://www.google.com/search?q=LICENSE).

---
