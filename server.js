import express from 'express';
import dotenv from 'dotenv';
import routes from './server/routes/index';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is up at port ${PORT}`);
});

export default app;
