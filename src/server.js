import express, { json } from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.route.js";
import { connectDB } from './config/db.js';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;
const api = "/api/v1";

let db = null;

async function connectToMongo() {
    db = await connectDB();
    if (!db) {
        console.log('Retrying in 5 seconds...');
        setTimeout(connectToMongo, 5000);
    } else {
        startServer();
    }
}

function startServer() {
    // Middleware
    app.use(cors());
    app.use(json());
    app.use(morgan('dev'));

    // Routes
    app.get('/', (req, res) => {
        res.send('Welcome to the care-connect API');
    });

    app.use(`${api}/auth`, authRoutes);

    // Handle 404
    app.use((req, res) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });

    // Start Server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

connectToMongo();
