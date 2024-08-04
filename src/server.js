import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import router from './routes/contacts.js';
import env from './utils/env.js';

export default function setupServer() {
  const PORT = Number(env('PORT', 3000));
  const app = express();

  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.use(cors());

  app.use(express.json());

  app.use('/contacts', router);

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
