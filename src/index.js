
import { app } from './app.js'
import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
});

import db from './db/db.js'

db()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log({ message: `server is listening on port ${process.env.PORT}` })
        })
    })
    .catch((error) => {
        console.log({ message: 'connection to database failed', error });
    })