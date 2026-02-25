import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import workoutRoute from "./routes/workout.route.js";
import exerciseRoute from "./routes/exercise.route.js";
import programRoute from "./routes/program.route.js";
import setRoute from "./routes/set.route.js";

import {apiNotFound} from "./middlewares/notFound.js";

dotenv.config();
const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', userRoute);
app.use('/workout', workoutRoute);
app.use('/exercises', exerciseRoute);
app.use('/program', programRoute);
app.use('/set', setRoute);

app.use("*", apiNotFound);

app.listen(process.env.PORT, () => {
    console.log('Server running on port 5000...')
});