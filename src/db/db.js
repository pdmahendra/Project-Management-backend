import mongoose from "mongoose";
import { dbName } from '../constant.js'

const connectDBFunc = async () => {
    try {
        const connectiondb = await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`);
        console.log(`mongo db connection established successfully`, connectiondb.connection.host);
        // console.log(connectiondb)
    } catch (error) {
        console.log('connection to Database failed', error);
        process.exit(1)
    }
}

export default connectDBFunc;

