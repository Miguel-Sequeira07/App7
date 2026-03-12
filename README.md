# App7 — Demonstração de React Hooks

Projeto de aula em **React + TypeScript + Vite** que demonstra o uso prático dos principais React Hooks, com um backend **Node.js + Express** a servir dados ao frontend.

---

## 🚀 Como instalar e arrancar

### Frontend

```bash
npm install
npm run dev
```

A aplicação estará disponível em **http://localhost:5173**.

### Backend (Express)

```bash
cd server
npm install
npm start
```

O servidor estará disponível em **http://localhost:3001**.

> **Nota:** Para a página *Animais* funcionar corretamente (fetch de dados), o backend deve estar em execução.

---

## ⚛️ Hooks demonstrados

| Hook | Onde está implementado | O que faz |
|---|---|---|
| `useState` | `Menu.tsx`, `Exec.tsx`, `Hooks.tsx` | Estado local: dropdown, formulários, contador |
| `useEffect` | `Menu.tsx`, `Animais.tsx`, `Hooks.tsx` | Fechar dropdown ao clicar fora; fetch à API; relógio em tempo real |
| `useMemo` | `Exercicios.tsx`, `Hooks.tsx` | Memorizar o exercício selecionado; filtrar lista de números |
| `useReducer` | `ThemeContext.tsx`, `Hooks.tsx` | Gerir o tema da app; mini carrinho de compras |
| `useContext` | `Menu.tsx`, `Hooks.tsx` | Aceder ao tema global (dark/light) em qualquer componente |
| `useRef` | `Menu.tsx`, `Hooks.tsx` | Referência ao submenu; focar input; contar renders |

---

## 📁 Estrutura de ficheiros

```
App7/
├── src/
│   ├── App.tsx                  ← Router principal (React Router DOM)
│   ├── main.tsx                 ← Ponto de entrada; envolve a app com ThemeProvider
│   ├── App.css / index.css      ← Estilos globais + dark mode
│   ├── context/
│   │   └── ThemeContext.tsx     ← useContext + useReducer (dark/light mode)
│   └── Component/
│       ├── Menu.tsx             ← Navbar com dropdown, toggle tema (useContext)
│       ├── Home.tsx             ← Página inicial
│       ├── Animais.tsx          ← Fetch à API Express (useEffect)
│       ├── Exercicios.tsx       ← useMemo para selecionar exercício
│       ├── Exec.tsx             ← Formulário de execução (useState)
│       ├── Hooks.tsx            ← Página /hooks — demonstração de todos os hooks
│       └── Utilidades.ts        ← dobro, selos, primos, inverterAlgarismos
├── server/
│   ├── index.js                 ← Servidor Express (GET /api/animais, GET /api/status)
│   ├── package.json
│   └── README.md
├── package.json
└── README.md
```

---

## 🔌 API Endpoints (Backend)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/status` | `{ status: "ok", timestamp: ... }` |
| GET | `/api/animais` | Lista de animais em JSON |

---

## 📚 Tecnologias

- React 19 + TypeScript
- Vite
- React Router DOM v7
- Bootstrap 5
- Node.js + Express (backend)
