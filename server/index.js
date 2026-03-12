const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Permitir requests do frontend
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// GET /api/status
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// GET /api/animais
app.get('/api/animais', (req, res) => {
  const animais = [
    { id: 1, nome: 'Cão', especie: 'Canis lupus familiaris', som: 'Au au' },
    { id: 2, nome: 'Gato', especie: 'Felis catus', som: 'Miau' },
    { id: 3, nome: 'Pássaro', especie: 'Aves', som: 'Piu piu' },
    { id: 4, nome: 'Cavalo', especie: 'Equus ferus caballus', som: 'Iiih' },
    { id: 5, nome: 'Vaca', especie: 'Bos taurus', som: 'Muu' },
  ];
  res.json(animais);
});

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
