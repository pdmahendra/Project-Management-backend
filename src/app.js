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
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("uploads"))
app.use(cookieParser())

//import routes
import userRoutes from './routes/user.routes.js'
import organizationRoutes from './routes/organization.routes.js';

import projectRoutes from './routes/project.routes.js'
import epicRoutes from './routes/epic.routes.js'
import storyRoutes from './routes/story.routes.js'

//routes declaration
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/organization', organizationRoutes)

app.use('/', projectRoutes,)
app.use('/', epicRoutes)
app.use('/', storyRoutes)











export { app }


