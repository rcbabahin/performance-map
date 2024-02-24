import express from "express";
import knex from "knex";
import cors from "cors";
import bcrypt from "bcryptjs";
import 'dotenv/config.js';

import { handleRegister } from "./controllers/register.js";
import { handleSignup } from "./controllers/singup.js";
import { handleSignin } from "./controllers/signin.js";
import { 
    handleDeleteDevice, 
    handleGetAllDevices, 
    handleGetDeviceById, 
    handleUpdateDevice 
} from "./controllers/devices.js";
import { 
    handleGetAllMeasurements, 
    handleGetMeasurementById 
} from "./controllers/measurements.js";

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: 'postgres',
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/api/devices', handleGetAllDevices(db));
app.get('/api/device/:id', handleGetDeviceById(db));
app.delete('/api/device/:id', handleDeleteDevice(db));
app.put('/api/device/:id', handleUpdateDevice(db));

app.get('/api/measurements', handleGetAllMeasurements(db));
app.get('/api/measurement/:id', handleGetMeasurementById(db));

app.post('/api/register', handleRegister(db));
// app.post('/api/signup', handleSignup(db, bcrypt));
app.post('/api/signin', handleSignin(db, bcrypt));

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
