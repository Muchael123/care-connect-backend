import express, { json } from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.route.js"
import { connectDB } from './config/db.js';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;
const api = "/api/v1"

connectDB()

// Middleware
app.use(cors());
app.use(json());
app.use(morgan('dev')); 


app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce API');
});

app.use(`${api}/auth`, authRoutes)

app.use((req, res, next) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});