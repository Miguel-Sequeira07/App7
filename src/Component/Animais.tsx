import { useEffect, useState } from 'react'

interface Animal {
  id: number;
  nome: string;
  especie: string;
  som: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const Animais = () => {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/animais`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar animais');
        return res.json();
      })
      .then((data: Animal[]) => {
        setAnimais(data);
        setLoading(false);
      })
      .catch(() => {
        setErro('Não foi possível ligar ao servidor. Certifica-te que o backend está a correr (cd server && npm start).');
        setLoading(false);
      });
  }, []);

  return (
    <div className="cx2">
      <h2>🐾 Animais</h2>
      <p className="text-muted mb-3">Dados carregados via <code>useEffect</code> + <code>fetch</code> da API Express.</p>
      {loading && <p>A carregar...</p>}
      {erro && <div className="alert alert-warning">{erro}</div>}
      {!loading && !erro && (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Som</th>
            </tr>
          </thead>
          <tbody>
            {animais.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nome}</td>
                <td><em>{a.especie}</em></td>
                <td>{a.som}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Animais
