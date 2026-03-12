# App7 — Backend Express

Servidor Node.js + Express que serve dados ao frontend React.

## Requisitos

- Node.js >= 18

## Instalação

```bash
cd server
npm install
```

## Arrancar o servidor

```bash
npm start
# ou
node index.js
```

O servidor fica disponível em **http://localhost:3001**.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/status` | Retorna `{ status: "ok", timestamp: ... }` |
| GET | `/api/animais` | Retorna lista de animais em JSON |

### Exemplo de resposta — `GET /api/animais`

```json
[
  { "id": 1, "nome": "Cão", "especie": "Canis lupus familiaris", "som": "Au au" },
  { "id": 2, "nome": "Gato", "especie": "Felis catus", "som": "Miau" },
  { "id": 3, "nome": "Pássaro", "especie": "Aves", "som": "Piu piu" },
  { "id": 4, "nome": "Cavalo", "especie": "Equus ferus caballus", "som": "Iiih" },
  { "id": 5, "nome": "Vaca", "especie": "Bos taurus", "som": "Muu" }
]
```
