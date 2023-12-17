import express from "express";
import knex from "knex";
import cors from "cors";

import handleRegister from "./controllers/register.js";

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'audio_test'
    }
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send({ response: 'hello from server'}) });
app.get('/devices', (req, res) => {
    db.select('*').from('devices')
        .then(devices => {
            res.json(devices)
        })
        .catch(err => res.status(400).json('Error getting all devices'))
})
app.get('/device/:id', (req, res) => {
    const { id } = req.params;

    db.select('*').from('devices').where({ id })
        .then(device => {
            if (device.length) {
                res.json(device[0]);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('Error getting device'))
})
app.get('/measurements/:deviceId', (req, res) => {
    const { deviceId } = req.params;

    db.select('*').from('measurments')
        .where('device_id', '=', deviceId)
        .then(raw => {
            res.json(raw)
        })
        .catch(err => res.status(400).json('Error getting raw data for the device'))
})

app.post('/register', handleRegister(db));

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})