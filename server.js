import express from 'express';
import routes from './server/routes/index';

const app = express();

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is up at port ${PORT}`);
});

export default app;
