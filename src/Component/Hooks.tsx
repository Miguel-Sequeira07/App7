import { useState, useEffect, useMemo, useReducer, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// --- useReducer: mini carrinho de compras ---
interface CartItem {
  id: number;
  nome: string;
  preco: number;
}

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEAR' };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item];
    case 'REMOVE':
      return state.filter((item) => item.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

const produtosDisponiveis: CartItem[] = [
  { id: 1, nome: 'Teclado', preco: 29 },
  { id: 2, nome: 'Rato', preco: 15 },
  { id: 3, nome: 'Monitor', preco: 199 },
];

// Constante fora do componente para evitar recriação a cada render
const NUMEROS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30];

// --- Componente principal ---
const Hooks = () => {
  // useState
  const [contador, setContador] = useState(0);

  // useEffect com setInterval
  const [timestamp, setTimestamp] = useState(() => new Date().toLocaleTimeString());
  useEffect(() => {
    const id = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // useMemo
  const [filtro, setFiltro] = useState('');
  const numerosFiltrados = useMemo(() => {
    return NUMEROS.filter((n) => n.toString().includes(filtro));
  }, [filtro]);

  // useReducer
  const [carrinho, carrinhoDispatch] = useReducer(cartReducer, []);

  // useContext
  const { state: themeState, dispatch: themeDispatch } = useTheme();
  const isDark = themeState.mode === 'dark';

  // useRef — focar input + contar renders sem causar re-render
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);
  const [renderDisplay, setRenderDisplay] = useState(0);

  // Incrementa o contador de renders usando useEffect (após cada render)
  useEffect(() => {
    renderCount.current += 1;
  });

  const cardStyle: React.CSSProperties = {
    background: isDark ? '#1e1e2e' : '#f8f9fa',
    border: isDark ? '1px solid #444' : '1px solid #dee2e6',
    color: isDark ? '#e0e0e0' : '#212529',
    borderRadius: '8px',
    padding: '1.2rem',
    marginBottom: '1.5rem',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#0d6efd',
    color: '#fff',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '0.8em',
    marginBottom: '0.6rem',
    fontFamily: 'monospace',
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        ⚛️ Demonstração de React Hooks
      </h2>

      {/* ─── useState ─── */}
      <div style={cardStyle}>
        <span style={badgeStyle}>useState</span>
        <h5>Contador simples</h5>
        <p>Valor actual: <strong>{contador}</strong></p>
        <button className="btn btn-primary btn-sm me-2" onClick={() => setContador(c => c + 1)}>＋ Incrementar</button>
        <button className="btn btn-secondary btn-sm" onClick={() => setContador(c => c - 1)}>－ Decrementar</button>
        <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => setContador(0)}>Reset</button>
      </div>

      {/* ─── useEffect ─── */}
      <div style={cardStyle}>
        <span style={badgeStyle}>useEffect</span>
        <h5>Relógio em tempo real</h5>
        <p>O <code>useEffect</code> inicia um <code>setInterval</code> quando o componente monta e limpa-o no cleanup.</p>
        <p style={{ fontSize: '2rem', fontFamily: 'monospace' }}>🕐 {timestamp}</p>
      </div>

      {/* ─── useMemo ─── */}
      <div style={cardStyle}>
        <span style={badgeStyle}>useMemo</span>
        <h5>Filtro de números memorizado</h5>
        <p>O <code>useMemo</code> só recalcula a lista quando o filtro muda.</p>
        <input
          className="form-control form-control-sm mb-2"
          style={{ maxWidth: '200px' }}
          placeholder="Filtrar números..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <div>
          {numerosFiltrados.length > 0
            ? numerosFiltrados.map((n) => (
                <span key={n} className="badge bg-success me-1">{n}</span>
              ))
            : <span className="text-muted">Sem resultados</span>
          }
        </div>
      </div>

      {/* ─── useReducer ─── */}
      <div style={cardStyle}>
        <span style={badgeStyle}>useReducer</span>
        <h5>Mini carrinho de compras</h5>
        <p>O <code>useReducer</code> gere o estado do carrinho com actions tipadas.</p>
        <div className="mb-2">
          {produtosDisponiveis.map((p) => (
            <button
              key={p.id}
              className="btn btn-outline-primary btn-sm me-2 mb-1"
              onClick={() => carrinhoDispatch({ type: 'ADD', item: p })}
            >
              + {p.nome} ({p.preco}€)
            </button>
          ))}
        </div>
        {carrinho.length === 0 ? (
          <p className="text-muted">Carrinho vazio</p>
        ) : (
          <>
            <ul className="list-group list-group-flush mb-2">
              {carrinho.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ background: 'transparent', color: 'inherit' }}>
                  {item.nome} — {item.preco}€
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => carrinhoDispatch({ type: 'REMOVE', id: item.id })}
                  >✕</button>
                </li>
              ))}
            </ul>
            <p><strong>Total: {carrinho.reduce((s, i) => s + i.preco, 0)}€</strong></p>
            <button className="btn btn-warning btn-sm" onClick={() => carrinhoDispatch({ type: 'CLEAR' })}>
              Esvaziar carrinho
            </button>
          </>
        )}
      </div>

      {/* ─── useContext ─── */}
      <div style={cardStyle}>
        <span style={badgeStyle}>useContext</span>
        <h5>Tema global (Dark / Light)</h5>
        <p>
          O <code>useContext</code> acede ao <code>ThemeContext</code> criado em <code>ThemeContext.tsx</code>.
          O tema é global — o botão no menu e este botão partilham o mesmo estado.
        </p>
        <p>Tema actual: <strong>{themeState.mode === 'dark' ? '🌙 Escuro' : '☀️ Claro'}</strong></p>
        <button
          className="btn btn-sm"
          style={{ background: isDark ? '#ffd700' : '#333', color: isDark ? '#333' : '#fff' }}
          onClick={() => themeDispatch({ type: 'TOGGLE_THEME' })}
        >
          {isDark ? '☀️ Mudar para Claro' : '🌙 Mudar para Escuro'}
        </button>
      </div>

      {/* ─── useRef ─── */}
      <div style={cardStyle}>
        <span style={badgeStyle}>useRef</span>
        <h5>Focar input + contar renders</h5>
        <p>
          <code>useRef</code> permite aceder diretamente a elementos DOM e guardar valores mutáveis
          sem causar re-renders. O contador é guardado num ref e actualizado via <code>useEffect</code>.
        </p>
        <p className="mb-2">
          Renders registados: <strong>{renderDisplay}</strong>
          {' '}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setRenderDisplay(renderCount.current)}
          >
            🔄 Ler contagem
          </button>
        </p>
        <div className="d-flex gap-2 align-items-center flex-wrap">
          <input
            ref={inputRef}
            className="form-control form-control-sm"
            style={{ maxWidth: '220px' }}
            placeholder="Foca-me com o botão →"
          />
          <button
            className="btn btn-info btn-sm"
            onClick={() => inputRef.current?.focus()}
          >
            🎯 Focar Input
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hooks;
