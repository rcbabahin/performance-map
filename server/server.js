import express from "express";
import knex from "knex";
import cors from "cors";

import handleRegister from "./controllers/register.js";
import { measurements } from "../src/utils/measurements.js";

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

const database = [
    {id: 1 , name: 'Cucumber_vol30max_noEQ_smooth1per2222', company: 'Yandex', category: 's', size: 0.9},
    {id: 2 , name: 'Chiron', company: 'Yandex', category: 'l', size: 0.25},
    {id: 3 , name: 'Echo Dot', company: 'Amazon', category: 'xs', size: 0.3},
    {id: 4 , name: 'CaplusaMini', company: 'VK', category: 'xs', size: 0.43},
    {id: 5 , name: 'CapsulaNeo', company: 'VK', category: 's', size: 0.2},
    {id: 6 , name: 'Citation500', company: 'Harman Kardon', category: 'l', size: 0.9},
    {id: 7 , name: 'asdasdasdasd', company: 'Yandex', category: 'l', size: 0.7},
    {id: 8 , name: 'asdasdasdasdd', company: 'Yandex', category: 'l', size: 0.6},
    {id: 9 , name: 'asdasdasdasd1123', company: 'Yandex', category: 'l', size: 0.55},
]
// {id: 8 , name: 'asdasdasdasdd', company: 'Yandex', category: 'l'},
// {id: 9 , name: 'asdasdasdasd1123', company: 'Yandex', category: 'l'},
// {id: 10 , name: 'asdasdasdasd11234', company: 'Yandex', category: 'l'},
// {id: 11 , name: 'asdasdasdasd112333', company: 'Yandex', category: 'l'},
// app.get('/devices', (req, res) => {
//     return res.json(database);
// })
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

app.get('/measurements', (req, res) => {

    db.select('*').from('devices')
        .then(async devices => {
            const retval = [];
            // console.log('all devices log', devices, devices.length);
            try {
                for(let i = 0; i < devices.length; i++) {
                    try {
                        const meas =  await db.select('*').from('measurments').where('device_id', '=', devices[i].id);
                    
                        retval.push({ id: devices[i].id, items: [] })
        
                        meas.forEach(element => {
                            delete element.device_id;
                            retval[i].items.push(element);
                        });
                    }
                    catch(e) {
                        // throw new Error(e); 
                        console.log(retval);
                        console.error(e);
                        res.status(400).json('Error getting measurements')
                    }
                }

                // await Promise.all(devices.map(async (device, i) => {
                //     // console.log('device', device);
                //     // console.log('i', i);
                //     try {
                //         const meas =  await db.select('*').from('measurments').where('device_id', '=', device.id);
                    
                //         retval.push({ id: device.id, items: [] })
        
                //         meas.forEach(element => {
                //             delete element.device_id;
                //             retval[i].items.push(element);
                //         });
                //     }
                //     catch(e) {
                //         // throw new Error(e); 
                //         console.log(retval);
                //         console.error(e);
                //         // res.status(400).json('Error getting measurements')
                //     }
                    
                // }));
                
                res.json(retval);
            }
            catch (e) {
                console.error(e);
                res.status(400).json('Error getting measurements')
            }

        })
        .catch(err => res.status(400).json('Error getting devices for measurements'))
})

// app.get('/measurements', (req, res) => {
//     res.json(measurements)
// })

app.post('/register', handleRegister(db));

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
