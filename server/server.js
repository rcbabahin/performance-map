import express from "express";
import knex from "knex";
import cors from "cors";
import 'dotenv/config.js';

import { handleRegister } from "./controllers/register.js";
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

app.get('/devices', handleGetAllDevices(db));
app.get('/device/:id', handleGetDeviceById(db));
app.delete('/device/:id', handleDeleteDevice(db));
app.put('/device/:id', handleUpdateDevice(db));

app.get('/measurements', handleGetAllMeasurements(db));
app.get('/measurement/:id', handleGetMeasurementById(db));

app.post('/register', handleRegister(db));

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
