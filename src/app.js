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

//import routes
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import orgnizationRoutes from './routes/orgnization.routes.js';

//routes declaration
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/users', projectRoutes)
app.use('/api/v1/orgnization', orgnizationRoutes)





export { app }
/*mongo uri pass ekdm shi hona chahiye.
 agr mongo conection me fail aata hai to usi k catch block me process.exit(1) taki server on h na ho
 bs hmara db connected hai sb check kr liya agr connect nhi hora to hum server on nhi kr rhe process.exit lga diya maine khudse
 
 next day-----------------
 sb okay hai error handeling dekhna hai model bnane hai and done.*/

 //14/04 - packeage install
 /*cookie-parser cors*/


 //nodemon - npm start - simple node start but npm run dev - nodemon starts.

 /*{
  "name": "learningnode",
  "version": "1.0.0",
  "description": "A basic Jira Soft Backend Clone",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "author": "Pratik Mahendra",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.3",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "mongoose": "^8.1.2",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.3"
  }
} */