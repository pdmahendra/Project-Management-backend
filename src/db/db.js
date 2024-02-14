import mongoose from "mongoose";
const dbName = 'pratikkadb'

const connectDBFunc = async() => {
try {
    const connectiondb = await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`);
    console.log(`mongo db connection established successfully`,connectiondb.connection.host);
    // console.log(connectiondb)
    // process.exit(1)
} catch (error) {
    console.log('connection to db failed we are at db.js',error);
    process.exit(1)
}
}

export default connectDBFunc;

//db dusre continent me hai so always use async await and try catch bhi.
/*console.log(connectiondb) -- krne bole tha isme imp. chize hai.

connectiondb.collections,
connectiondb.connectionString -- mongodb+srv://pratikkhatri520:wbZbtMlZh6TrTsdC@cluster0.mwv7j3b.mongodb.net/pratikkadb', //pass bhi dera ye to yr
.host
.port
.name
*/

//req/* re.params,req.body,.cookies