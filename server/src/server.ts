import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

/**
 * Exemplo de como usar o cors() em Produção
 * app.use(
   cors({
      origin: 'https://site.com.br',
   })
); */
app.use(cors()); // cors() permite qualquer front-end usar este server em Desenvolvimento
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
   console.log('HTTP server running!');
});
