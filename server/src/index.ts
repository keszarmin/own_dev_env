import "reflect-metadata"
import { Express,Request,Response } from "express"
import * as dotenv from "dotenv"
import Database from "./config/database"
import { model } from "./entity/model"
import { DataSource } from "typeorm"

dotenv.config()

const app: Express = require("express")()
const port: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 4000
const server_host:string = process.env.SERVER_HOST ? process.env.SERVER_HOST : "localhost"

const DB = new Database();

app.listen(port, () => {
    console.log("Server is running on http://localhost:4000")
})

app.get("/info", (req:Request,res:Response) => {
    res.json({
        "server_host":server_host,
        "server_port":port,
        "routes": {
            "/info":"GET - Returns server information",
        }
    })
})

app.route("/api/")
    .get(async (req:Request,res:Response) => {
        res.json(await DB.getAllRows());
    })