import express from 'express';
import cors from 'cors';
import './db.js';            
import notesRouter from './routes/notes.js';
import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});