import "reflect-metadata"
import { Express,Request,Response } from "express"
import * as dotenv from "dotenv"
import Database from "./config/database"
import { model } from "./entity/model"
import * as cors from "cors"
import { p } from "react-router/dist/development/fog-of-war-Cm1iXIp7"

dotenv.config()

const app: Express = require("express")()
const port: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 4000
const server_host:string = process.env.SERVER_HOST ? process.env.SERVER_HOST : "localhost"

const DB = new Database();

app.use(require("body-parser").json())
app.use(cors())

app.listen(port, () => {
    console.log("Server is running on http://localhost:4000")
})

app.get("/info", (req:Request,res:Response) => {
    res.json({
        "server_host":server_host,
        "server_port":port,
        "routes": {
            "/info":"GET - Returns server information",
            "/api/":"GET - Returns all rows in the database",
            "/api/ ":[
                "POST - Adds a new row to the database",
                "name - string",
                "description - string",
                "type - string",
                "data - string",
                "username - string"
            ],
            "/api/:id":"DELETE - Removes a row from the database",
            "/api/:id ":"PATCH - Updates a row in the database"
        }
    })
    console.log("GET /info")
})

app.route("/api/:name/:password")
.post(async (req:Request,res:Response) => {
    const {username,password} = req.params;
    res.json(await DB.getAllRows(username,password));
    console.log("GET /api/")
})

app.route("/api")
.post(async (req:Request,res:Response) => {
    const {name,description,type,data,username,password} = req.body;
    const Model = new model();
        Model.name = name;
        Model.description = description;
        Model.type = type;
        Model.data = data;
        Model.hash = "";
        Model.owner = username
        Model.owner_password = password
    res.json(await DB.AddRow(Model,username,password));
    console.log("POST /api/")
})

app.route("/api/:id")
.delete(async (req:Request,res:Response) => {
    const {id,username,password} = req.params;
    res.json(await DB.removeRow(parseInt(id),username,password));
    console.log("DELETE /api/")
})
.patch(async (req:Request,res:Response) => {
    const {id} = req.params;
    const {name,description,type,data,username,password} = req.body;
    const Model = new model();
        Model.name = name;  
        Model.description = description;
        Model.type = type;
        Model.data = data;
        Model.hash = "";
        Model.owner = username;
        Model.owner_password = password
    res.json(await DB.updateRow(parseInt(id),Model,username,password));
    console.log("PATCH /api/")
})

app.route("/login")
.post(async (req:Request,res:Response) => {
    const {username,password} = req.body;
    res.json(await DB.chechkUser(username,password));
    console.log("POST /login User:",username," - ",await DB.chechkUser(username,password));
})