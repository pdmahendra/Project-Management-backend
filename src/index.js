
import { app } from './app.js'
import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
});


app.get('/', (req, res) => {
    res.send('server start on port')
})

import db from './db/db.js'


db()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`server listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log('connection fail ho gya to listen nhi kr paye', error);
    })