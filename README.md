# 💻 macOS Portfolio — Caio Resende

> Portfólio pessoal com interface inspirada no macOS, com janelas arrastáveis, redimensionáveis e aplicativos interativos.

<table>
  <tr>
    <td width="750px">
      <div align="justify">
        Este projeto é um <b>portfólio interativo</b> que simula a experiência de um desktop macOS diretamente no navegador. Ele foi construído com <b>React + TypeScript + Vite</b> e conta com aplicativos funcionais como um terminal, um editor de código, um mapa de viagens, um navegador Safari e um app de configurações com galeria de fotos. O objetivo é apresentar minhas experiências, certificações e projetos de forma criativa e memorável.
      </div>
    </td>
    <td>
      <div align="center">
        🍎
      </div>
    </td>
  </tr>
</table>

---

## 🚧 Status do Projeto

[![Vercel](https://img.shields.io/badge/deploy-vercel-black?style=for-the-badge&logo=vercel)](https://caiosresende.vercel.app)
![React](https://img.shields.io/badge/React-18-007ec6?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ec6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-007ec6?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-007ec6?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GitHub last commit](https://img.shields.io/github/last-commit/CaioSResende/caiosresende?style=for-the-badge&logo=clockify)

---

## 📚 Índice
- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração](#-demonstração)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 🔗 Links Úteis
* 🌐 **Demo Online:** [caiosresende.vercel.app](https://caiosresende.vercel.app)
* :octocat: **Repositório:** [github.com/CaioSResende/caiosresende](https://github.com/CaioSResende/caiosresende)
* 💼 **LinkedIn:** [linkedin.com/in/caiosouzaderesende](https://linkedin.com/in/caiosouzaderesende)

---

## 📝 Sobre o Projeto

Este portfólio nasceu da vontade de apresentar minhas experiências de uma forma diferente do convencional. Em vez de uma página estática com seções de texto, a ideia foi criar uma **experiência interativa** que simula um sistema operacional macOS rodando no navegador.

O projeto foi desenvolvido do zero com foco em:
- **Experiência do usuário** — janelas arrastáveis, redimensionáveis e com botões de tráfego reais
- **Identidade visual** — design fiel ao macOS com glassmorphism, blur e paleta dark
- **Conteúdo real** — cada app traz informações reais sobre minha trajetória profissional e pessoal

---

## ✨ Funcionalidades Principais

- 🖥️ **Desktop macOS** — Dock, barra de menu com hora e data, wallpaper animado
- 🪟 **Janelas interativas** — arrastar, redimensionar, maximizar, fechar
- 💻 **Terminal** — comandos reais (`about`, `experience`, `certificates`, `contact`), histórico com setas, toggle EN/PT
- 🗺️ **Maps** — mapa interativo com lugares que visitei, fotos e descrições
- 🌐 **Safari** — página inicial com favoritos e playlists do Spotify embutidas
- ⌨️ **VSCode** — editor simulado com syntax highlighting para Terraform, Docker e YAML
- ⚙️ **Settings** — sobre mim, experiências, educação e galeria de fotos estilo VSCO
- 👤 **Contacts** — cartão de contato com links para GitHub, LinkedIn, email e Instagram

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end
* **Framework:** React 18 + TypeScript
* **Build Tool:** Vite
* **Estilização:** Tailwind CSS + CSS customizado
* **Animações:** Framer Motion
* **Ícones:** Lucide React
* **Mapas:** Leaflet + React-Leaflet (OpenStreetMap / CartoDB Dark Matter)

### ☁️ Deploy
* **Hospedagem:** Vercel
* **CI/CD:** Deploy automático a cada `git push` na branch `main`

---

## 🔧 Instalação e Execução

### Pré-requisitos
* **Node.js:** v18 ou superior
* **npm** ou **yarn**

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/CaioSResende/caiosresende.git
cd caiosresende/terminalPortfolio-macOS
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Instale dependências do mapa:**
```bash
npm install leaflet react-leaflet @types/leaflet
```

4. **Rode em modo de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse no navegador:**
```
http://localhost:5173
```

### Build para produção
```bash
npm run build
```

---

## 📂 Estrutura de Pastas

```
terminalPortfolio-macOS/
├── public/                  # 🖼️ Imagens estáticas (fotos do Maps, wallpaper)
│   ├── belohorizonte.jpg
│   ├── buzios.jpg
│   └── ...
├── src/
│   ├── assets/              # 🎨 Ícones dos apps do Dock
│   ├── components/          # 🧱 Componentes principais
│   │   ├── AppWindow.tsx    # 🪟 Janela arrastável e redimensionável
│   │   ├── Dock.tsx         # 🚢 Dock inferior
│   │   ├── MenuBar.tsx      # 📋 Barra de menu superior
│   │   ├── TerminalApp.tsx  # 💻 Terminal interativo
│   │   ├── SafariApp.tsx    # 🌐 Navegador simulado
│   │   ├── VSCodeApp.tsx    # ⌨️ Editor de código simulado
│   │   ├── MapsApp.tsx      # 🗺️ Mapa de viagens
│   │   ├── SettingsApp.tsx  # ⚙️ Configurações e galeria
│   │   └── ContactsApp.tsx  # 👤 Cartão de contato
│   ├── pages/
│   │   └── Index.tsx        # 🏠 Página principal (Desktop)
│   └── index.css            # 🎨 Estilos globais
├── package.json
└── vite.config.ts
```

---

## 🎥 Demonstração

| Settings | Terminal |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/3dae6e51-a96e-42d7-808a-9ad2158ccfbe" width="400"/> | <img src="https://github.com/user-attachments/assets/bd1880a2-13d6-4534-9e88-da9fdf1be08c" width="400"/> |
| **Maps** | **Safari** |
| <img src="https://github.com/user-attachments/assets/ebf8bfde-5066-4206-a468-07940f33b46f" width="400"/> | <img src="https://github.com/user-attachments/assets/bf46480f-3fc5-49fc-b53b-b6fe369d7852" width="400"/> |
| **VSCode** | **Contacts** |
| <img src="https://github.com/user-attachments/assets/f05abcbb-9734-48c3-83b1-839b2277b5fa" width="400"/> | <img src="https://github.com/user-attachments/assets/2cb07873-1280-4b9d-b3c8-8b886e75bbfc" width="400"/> |

> 💡 Acesse a demo ao vivo em [caiosresende.vercel.app](https://caiosresende.vercel.app)

---

## 👤 Autor

| 👤 Nome | :octocat: GitHub | 💼 LinkedIn | 📤 Email |
|---------|-----------------|-------------|----------|
| Caio Souza de Resende | [CaioSResende](https://github.com/CaioSResende) | [caiosouzaderesende](https://linkedin.com/in/caiosouzaderesende) | caiosouzamresende@gmail.com |

**Junior Cloud Architect @ ForceOne** | Estudante de Engenharia de Software @ PUC Minas

☁️ AWS Certified Cloud Practitioner · AI Practitioner · Solutions Architect · CloudOps Engineer

---

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**.
