import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import healthRoute from "./routes/health.route.js";
import userRoute from "./routes/user.route.js";
import workoutRoute from "./routes/workout.route.js";

dotenv.config();
const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('Server running on port 5000...')});

app.use('/health', healthRoute);

app.use('/auth', userRoute);
app.use('/workout', workoutRoute);