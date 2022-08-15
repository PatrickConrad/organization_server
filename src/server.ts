import dotenv from "dotenv";
dotenv.config({path: __dirname+'/config/config.env'});
import { connectToDatabase, disconnectFromDatabase } from './config/database';
import express, {Request, Response, NextFunction} from 'express';
import {router} from './router';
import { corsSetup } from "./config/cors";

const app = express();

app.use((req: Request, res: Response, next: NextFunction)=>corsSetup(req, res, next))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', router);

const port = process.env.PORT || 8091
const server = app.listen(port, async () => {
    await connectToDatabase();
    console.log(`Ready on port ${port}`);
})


.on("error", (e)=> console.log(e,"Error starting server."));

 process.on('SIGTERM'||"SIGINT", async ()=>{
    console.log("Server is shutting down")
    server.close();
    console.log("Database is closing")
    // await disconnectFromDatabase();
    process.exit(0);
})