import express from 'express';
import dotenv from 'dotenv';
import healthRoute from "./routes/health.route.js";

dotenv.config();
const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('Server running on port 5000...')});

app.use('/health', healthRoute)