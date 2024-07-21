import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import contactsRouter from './routes/contacts.js';

export const setupServer = () => {
  const app = express();
  const logger = pinoHttp();

  app.use(cors());
  app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};
