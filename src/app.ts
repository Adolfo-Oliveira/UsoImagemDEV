import app from './server';

const PORT = process.env.PORT || 3333; // 3333 Pode ser 3334, 3335, 3336, ...

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
