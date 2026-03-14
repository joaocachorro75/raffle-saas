# Raffle SaaS

SaaS de Rifas Online com layouts personalizados e integração de pagamento.

## Funcionalidades

- Criação de rifas com temas personalizados (Tigrinho, Super Heróis, etc.)
- Venda de bilhetes online com pagamento integrado
- Sorteio automático e transparente
- Painel de controle completo

## Deploy no EasyPanel

1. Conecte este repositório no EasyPanel
2. Selecione Docker como tipo de deploy
3. Configure as variáveis de ambiente:
   - PORT=80
   - MONGO_URI=sua_string_de_conexao_mongodb
   - JWT_SECRET=sua_chave_secreta

## Desenvolvimento Local

```bash
npm install
npm run dev
```

## Tecnologias

- Frontend: React.js
- Backend: Node.js + Express
- Banco de dados: MongoDB
- Deploy: Docker + EasyPanel
