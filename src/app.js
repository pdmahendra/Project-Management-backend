//os,fs,http,multer, how to connect db.
//diff module bnake mongodb connect krege
import express, { urlencoded } from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: process.env.CREDENTIALS
}));

//middleware config [jate hue in sb se milte jana/bich ki checking]
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("uploads"))
app.use(cookieParser())


export { app }
/*mongo uri pass ekdm shi hona chahiye.
 agr mongo conection me fail aata hai to usi k catch block me process.exit(1) taki server on h na ho
 bs hmara db connected hai sb check kr liya agr connect nhi hora to hum server on nhi kr rhe process.exit lga diya maine khudse
 
 next day-----------------
 sb okay hai error handeling dekhna hai model bnane hai and done.*/

 //14/04 - packeage install
 /*cookie-parser cors*/


 //nodemon - npm start - simple node start but npm run dev - nodemon starts.